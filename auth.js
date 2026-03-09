/**
 * auth.js — Módulo de autenticação para material extra do livro
 * Usa Supabase como backend de autenticação
 * Versão 2.0 - Com retry automático e melhor tratamento de erros
 */

const AUTH_CONFIG = {
    // URL do projeto Supabase
    supabaseUrl: 'https://pymeuaarplxbcibcheot.supabase.co',
    // Chave pública do Supabase (Legacy Anon Key - mais estável)
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bWV1YWFycGx4YmNpYmNoZW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NTMwMDgsImV4cCI6MjA4NDQyOTAwOH0.MthoJvHFF3z6puGIeeygyFhOZK4B1XyZCANDsQTP1ok',
    // Nome do livro para este projeto (usado na validação do código)
    livroAtual: 'Banco de Dados em 9 Passos',
    // Chave do localStorage
    storageKey: 'bd9passos_user',
    // Chave de sessão Supabase
    sessionKey: 'bd9passos_session',
    // URL da página de login
    loginPage: 'login.html',
    // URL da página principal
    mainPage: 'index.html',
    // Número máximo de tentativas de reconexão
    maxRetries: 3,
    // Tempo entre tentativas (ms)
    retryDelay: 1000,
    // Modo debug (ativar para ver logs no console)
    debug: true
};

// Cliente Supabase (inicializado depois que o script carrega)
let supabase = null;

/**
 * Log de debug condicional
 */
function debugLog(...args) {
    if (AUTH_CONFIG.debug) {
        console.log('[Auth Debug]', ...args);
    }
}

/**
 * Aguarda um tempo em milissegundos
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Executa uma função com retry automático
 */
async function withRetry(fn, retries = AUTH_CONFIG.maxRetries) {
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            debugLog(`Tentativa ${i + 1}/${retries}`);
            return await fn();
        } catch (error) {
            lastError = error;
            debugLog(`Erro na tentativa ${i + 1}:`, error.message);
            if (i < retries - 1) {
                await sleep(AUTH_CONFIG.retryDelay * (i + 1));
            }
        }
    }
    throw lastError;
}

/**
 * Inicializa o cliente Supabase
 * Deve ser chamado após o carregamento do script do Supabase
 */
function initSupabase() {
    if (window.supabase && !supabase) {
        try {
            supabase = window.supabase.createClient(
                AUTH_CONFIG.supabaseUrl,
                AUTH_CONFIG.supabaseKey,
                {
                    auth: {
                        persistSession: true,
                        autoRefreshToken: true,
                        detectSessionInUrl: false
                    }
                }
            );
            debugLog('Supabase inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar Supabase:', error);
        }
    }
    return supabase;
}

/**
 * Valida o código secreto do livro via RPC no Supabase
 * @param {string} codigo - Código informado pelo usuário
 * @returns {Promise<{valido: boolean, livro: string|null}>}
 */
async function validarCodigoLivro(codigo) {
    const client = initSupabase();
    if (!client) {
        debugLog('Supabase não inicializado para validação');
        return { valido: false, livro: null };
    }

    try {
        debugLog('Validando código para livro:', AUTH_CONFIG.livroAtual);

        const { data, error } = await client.rpc('validar_codigo_livro', {
            p_codigo: codigo.trim(),
            p_livro_nome: AUTH_CONFIG.livroAtual
        });

        if (error) {
            console.error('Erro ao validar código:', error);
            return { valido: false, livro: null };
        }

        debugLog('Resultado da validação:', data);

        if (data === true) {
            return { valido: true, livro: AUTH_CONFIG.livroAtual };
        }

        return { valido: false, livro: null };
    } catch (error) {
        console.error('Erro na validação do código:', error);
        return { valido: false, livro: null };
    }
}

/**
 * Faz cadastro de novo usuário
 * @param {string} nome - Nome do usuário
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @param {string} codigoLivro - Código secreto do livro
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function signup(nome, email, senha, codigoLivro) {
    try {
        // Valida código do livro via RPC no Supabase
        const validacao = await validarCodigoLivro(codigoLivro);
        if (!validacao.valido) {
            return {
                success: false,
                message: 'Código do livro inválido. Verifique o código na contracapa do seu livro.'
            };
        }

        debugLog('Código válido para livro:', validacao.livro);

        const client = initSupabase();
        if (!client) {
            return {
                success: false,
                message: 'Erro ao inicializar autenticação. Recarregue a página.'
            };
        }

        const { data, error } = await client.auth.signUp({
            email: email,
            password: senha,
            options: {
                data: {
                    nome: nome,
                    livro: validacao.livro
                }
            }
        });

        if (error) {
            // Traduz mensagens de erro comuns
            let mensagem = error.message;
            if (error.message.includes('already registered')) {
                mensagem = 'Este email já está cadastrado. Faça login ou use outro email.';
            } else if (error.message.includes('password')) {
                mensagem = 'A senha deve ter no mínimo 6 caracteres.';
            } else if (error.message.includes('email')) {
                mensagem = 'Email inválido. Verifique o formato do email.';
            }
            return { success: false, message: mensagem };
        }

        return {
            success: true,
            message: 'Conta criada com sucesso! Você já pode fazer login.'
        };
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return {
            success: false,
            message: 'Erro de conexão. Tente novamente.'
        };
    }
}

/**
 * Faz login do usuário via Supabase
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<{success: boolean, nome?: string, message: string}>}
 */
async function login(email, senha) {
    debugLog('Iniciando login para:', email);

    const client = initSupabase();
    if (!client) {
        return {
            success: false,
            message: 'Erro ao inicializar autenticação. Recarregue a página.'
        };
    }

    try {
        // Usa retry automático para lidar com erros de conexão
        const { data, error } = await withRetry(async () => {
            debugLog('Chamando signInWithPassword...');
            const result = await client.auth.signInWithPassword({
                email: email,
                password: senha
            });

            // Se houver erro de rede, lança para retry
            if (result.error && (
                result.error.message.includes('fetch') ||
                result.error.message.includes('network') ||
                result.error.message.includes('Failed to fetch') ||
                result.error.status === 0
            )) {
                throw result.error;
            }

            return result;
        });

        if (error) {
            debugLog('Erro no login:', error);
            let mensagem = error.message;
            if (error.message.includes('Invalid login credentials')) {
                mensagem = 'Email ou senha incorretos.';
            } else if (error.message.includes('Email not confirmed')) {
                mensagem = 'Email ainda não confirmado. Verifique sua caixa de entrada.';
            } else if (error.message.includes('fetch') || error.message.includes('network')) {
                mensagem = 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.';
            }
            return { success: false, message: mensagem };
        }

        debugLog('Login bem-sucedido, dados:', data.user?.email);

        // Extrai nome dos metadados do usuário
        const nome = data.user?.user_metadata?.nome || 'Usuário';

        // Salva sessão no localStorage para compatibilidade
        const userData = {
            email: data.user.email,
            nome: nome,
            loginTime: new Date().toISOString(),
            userId: data.user.id
        };
        localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(userData));

        // Salva também o token de sessão
        if (data.session) {
            localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at
            }));
        }

        return {
            success: true,
            nome: nome,
            message: 'Login realizado com sucesso!'
        };
    } catch (error) {
        console.error('Erro no login após retries:', error);
        debugLog('Erro final:', error);
        return {
            success: false,
            message: 'Erro de conexão. Verifique sua internet e tente novamente.'
        };
    }
}

/**
 * Faz logout do usuário
 */
async function logout() {
    debugLog('Iniciando logout...');
    try {
        const client = initSupabase();
        if (client) {
            await client.auth.signOut();
            debugLog('Logout do Supabase realizado');
        }
    } catch (error) {
        debugLog('Erro no logout do Supabase (ignorado):', error);
    }
    // Sempre limpa o localStorage, mesmo se o logout do Supabase falhar
    localStorage.removeItem(AUTH_CONFIG.storageKey);
    localStorage.removeItem(AUTH_CONFIG.sessionKey);
    debugLog('localStorage limpo, redirecionando...');
    window.location.href = AUTH_CONFIG.loginPage;
}

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean}
 */
function isAuthenticated() {
    const userData = localStorage.getItem(AUTH_CONFIG.storageKey);
    return userData !== null;
}

/**
 * Retorna os dados do usuário logado
 * @returns {Object|null}
 */
function getUser() {
    const userData = localStorage.getItem(AUTH_CONFIG.storageKey);
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Requer autenticação - redireciona para login se não autenticado
 * Deve ser chamado no início de páginas protegidas
 */
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = AUTH_CONFIG.loginPage;
    }
}

/**
 * Redireciona para página principal se já estiver logado
 * Usar na página de login
 */
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = AUTH_CONFIG.mainPage;
    }
}

// Expõe todas as funções no escopo global (window)
// Isso garante que funcionem corretamente em todos os contextos
window.AUTH_CONFIG = AUTH_CONFIG;
window.debugLog = debugLog;
window.sleep = sleep;
window.withRetry = withRetry;
window.initSupabase = initSupabase;
window.validarCodigoLivro = validarCodigoLivro;
window.signup = signup;
window.login = login;
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.getUser = getUser;
window.requireAuth = requireAuth;
window.redirectIfAuthenticated = redirectIfAuthenticated;

// Log para confirmar que auth.js carregou completamente
console.log('[Auth] auth.js carregado com sucesso. Funções disponíveis:',
    Object.keys(window).filter(k => ['login', 'signup', 'logout', 'initSupabase'].includes(k)));
