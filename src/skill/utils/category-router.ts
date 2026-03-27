import type {
  RouteResult,
  CategoryConfig,
  WorkflowConfig,
  ClarifyOption,
} from '../types.js';

export const categoryMap: Record<string, CategoryConfig> = {
  project: {
    name: '项目管理',
    tools: 5,
    tokens: 400,
    keywords: ['project', 'workspace', '项目', '工程', 'project_create', 'project_all'],
    tools_list: ['project_create', 'project_one', 'project_all', 'project_update', 'project_remove'],
    workflows: ['create_project', 'list_projects'],
  },

  application: {
    name: '应用管理',
    tools: 26,
    tokens: 2000,
    keywords: ['app', 'application', 'service', 'deploy', 'build', 'repo', 'env', '应用', '部署', '发布', '构建', 'github', 'gitlab', 'docker'],
    tools_list: [
      'application_create', 'application_one', 'application_delete', 'application_deploy',
      'application_redeploy', 'application_start', 'application_stop', 'application_reload',
      'application_save_environment', 'application_save_build_type', 'application_save_github_provider',
      'application_save_gitlab_provider', 'application_save_docker_provider', 'application_update',
      'application_read_monitoring'
    ],
    subcategories: {
      lifecycle: ['application_create', 'application_deploy', 'application_start', 'application_stop', 'application_reload'],
      source: ['application_save_github_provider', 'application_save_gitlab_provider', 'application_save_docker_provider', 'application_save_git_provider'],
      config: ['application_save_environment', 'application_save_build_type', 'application_update_traefik_config'],
      monitoring: ['application_read_monitoring', 'application_one'],
    },
    workflows: ['deploy_app', 'configure_app', 'restart_app'],
  },

  database: {
    name: '数据库管理',
    tools: 60,
    tokens: 5000,
    keywords: ['database', 'db', 'postgres', 'mysql', 'mariadb', 'mongo', 'mongodb', 'redis', '数据库', 'sql'],
    engines: {
      postgres: { tools: 12, tokens: 1000, keywords: ['postgres', 'postgresql', 'pg'] },
      mysql: { tools: 12, tokens: 1000, keywords: ['mysql'] },
      mariadb: { tools: 12, tokens: 1000, keywords: ['mariadb', 'maria'] },
      mongo: { tools: 12, tokens: 1000, keywords: ['mongo', 'mongodb'] },
      redis: { tools: 12, tokens: 1000, keywords: ['redis', '缓存', 'cache'] },
    },
    workflows: ['create_database', 'backup_database'],
  },

  compose: {
    name: 'Docker Compose',
    tools: 17,
    tokens: 1200,
    keywords: ['compose', 'docker-compose', 'stack', '编排', '多服务', 'yaml'],
    tools_list: [
      'compose_create', 'compose_one', 'compose_update', 'compose_delete',
      'compose_deploy', 'compose_redeploy', 'compose_start', 'compose_stop'
    ],
    workflows: ['deploy_compose', 'update_compose'],
  },

  domain: {
    name: '域名与网络',
    tools: 22,
    tokens: 1500,
    keywords: ['domain', 'dns', 'https', 'ssl', 'tls', 'certificate', 'port', 'redirect', '域名', '端口', '证书', '重定向', 'traefik'],
    tools_list: [
      'domain_create', 'domain_one', 'domain_delete', 'domain_validate_domain',
      'port_create', 'port_one', 'redirect_create', 'certificate_create'
    ],
    subcategories: {
      domain: ['domain_create', 'domain_one', 'domain_delete', 'domain_validate_domain'],
      port: ['port_create', 'port_one', 'port_update', 'port_delete'],
      redirect: ['redirect_create', 'redirect_one', 'redirect_update'],
      certificate: ['certificate_create', 'certificate_one', 'certificate_renew'],
    },
    workflows: ['expose_service', 'setup_ssl'],
  },

  server: {
    name: '服务器管理',
    tools: 16,
    tokens: 1200,
    keywords: ['server', 'host', 'node', 'ssh', 'swarm', 'cluster', '服务器', '节点', '集群'],
    tools_list: [
      'server_create', 'server_one', 'server_all', 'server_setup',
      'server_validate', 'server_remove', 'swarm_get_nodes', 'cluster_get_nodes'
    ],
    workflows: ['add_server', 'setup_cluster'],
  },

  docker: {
    name: 'Docker 操作',
    tools: 7,
    tokens: 500,
    keywords: ['docker', 'container', 'runtime', '容器', '重启', 'container'],
    tools_list: [
      'docker_get_containers', 'docker_restart_container', 'docker_get_config',
      'docker_get_containers_by_app_name_match'
    ],
    workflows: ['debug_container', 'restart_container'],
  },

  deployment: {
    name: '部署与监控',
    tools: 10,
    tokens: 800,
    keywords: ['deployment', 'rollback', 'monitoring', 'metrics', '部署记录', '回滚', '监控', 'history'],
    tools_list: ['deployment_all', 'deployment_kill_process', 'rollback_rollback', 'application_read_monitoring'],
    workflows: ['check_deployment', 'rollback_deployment'],
  },

  settings: {
    name: '系统设置',
    tools: 26,
    tokens: 1800,
    keywords: ['settings', 'maintenance', 'cleanup', 'traefik', 'schedule', '设置', '维护', '清理', '定时任务', 'cron'],
    tools_list: [
      'settings_reload_traefik', 'settings_clean_all', 'settings_clean_unused_images',
      'schedule_create', 'schedule_list'
    ],
    workflows: ['system_cleanup', 'schedule_task'],
  },

  user: {
    name: '用户与权限',
    tools: 23,
    tokens: 1600,
    keywords: ['user', 'permission', 'auth', 'token', 'api key', '用户', '权限', '认证', '令牌', 'organization'],
    tools_list: [
      'user_all', 'user_create_api_key', 'user_assign_permissions',
      'auth_create_user', 'organization_create'
    ],
    workflows: ['create_user', 'assign_permission'],
  },

  notification: {
    name: '通知告警',
    tools: 15,
    tokens: 1000,
    keywords: ['notification', 'alert', 'slack', 'telegram', 'discord', 'email', '通知', '告警', '邮件'],
    providers: ['slack', 'telegram', 'discord', 'email'],
    tools_list: [
      'notification_create_slack', 'notification_create_telegram',
      'notification_create_discord', 'notification_create_email'
    ],
    workflows: ['setup_notification'],
  },

  backup: {
    name: '备份恢复',
    tools: 24,
    tokens: 1800,
    keywords: ['backup', 'restore', 'destination', 's3', 'rollback', '备份', '恢复', '回滚', 'snapshot'],
    tools_list: [
      'backup_create', 'backup_manual_backup_postgres', 'destination_create',
      'volume_backup_create', 'rollback_rollback'
    ],
    workflows: ['backup_database', 'restore_backup'],
  },

  ssh: {
    name: 'SSH 密钥',
    tools: 6,
    tokens: 400,
    keywords: ['ssh key', 'public key', 'private key', '密钥', '公钥', '私钥', 'ssh'],
    tools_list: ['ssh_key_create', 'ssh_key_generate', 'ssh_key_all'],
    workflows: ['generate_ssh_key'],
  },

  registry: {
    name: '镜像仓库',
    tools: 6,
    tokens: 400,
    keywords: ['registry', 'docker registry', 'image repo', '镜像仓库', 'harbor', 'ecr'],
    tools_list: ['registry_create', 'registry_one', 'registry_test_connection'],
    workflows: ['add_registry'],
  },

  security: {
    name: '安全认证',
    tools: 9,
    tokens: 600,
    keywords: ['security', 'basic auth', 'certificate', '安全', '认证', '证书', 'protect'],
    tools_list: ['security_create', 'security_update', 'certificate_create'],
    workflows: ['protect_app'],
  },
};

export const crossCategoryWorkflows: Record<string, WorkflowConfig> = {
  full_deploy: {
    name: '完整应用部署',
    categories: ['project', 'application', 'domain'],
    tokens: 4000,
    keywords: ['完整部署', '全套', '一起部署', 'full deploy', 'deploy app with domain'],
  },

  full_stack: {
    name: '全栈环境搭建',
    categories: ['project', 'application', 'database', 'domain'],
    tokens: 8000,
    keywords: ['搭建环境', '全套环境', '完整环境', 'full stack', '全套部署'],
  },

  debug_app: {
    name: '应用调试',
    categories: ['application', 'docker', 'deployment'],
    tokens: 3500,
    keywords: ['调试', '排查', 'debug', 'troubleshoot', '日志', 'log', 'restart'],
  },

  db_with_backup: {
    name: '数据库+备份',
    categories: ['database', 'backup'],
    tokens: 6500,
    keywords: ['数据库备份', '自动备份', 'backup database', 'db backup'],
  },

  server_setup: {
    name: '服务器初始化',
    categories: ['server', 'ssh', 'settings'],
    tokens: 3500,
    keywords: ['添加服务器', '初始化服务器', 'server setup', 'new server'],
  },
};

export class CategoryRouter {
  
  route(userInput: string): RouteResult {
    const normalizedInput = userInput.toLowerCase();
    
    const workflowMatch = this.matchCrossCategoryWorkflow(normalizedInput);
    if (workflowMatch.confidence > 0.8) {
      const workflow = crossCategoryWorkflows[workflowMatch.workflow!];
      return {
        strategy: 'cross-category-workflow',
        confidence: workflowMatch.confidence,
        workflow: workflowMatch.workflow,
        categories: workflow.categories,
        tokenEstimate: workflow.tokens,
      };
    }

    const matchedCategories = this.matchCategories(normalizedInput);
    
    if (matchedCategories.length === 0) {
      return {
        strategy: 'clarify',
        confidence: 0,
        tokenEstimate: 0,
        message: '请描述您想执行的操作，例如：\n- 部署应用到生产环境\n- 创建 PostgreSQL 数据库\n- 查看应用日志',
      };
    }

    if (matchedCategories.length === 1) {
      const category = matchedCategories[0];
      const subMatch = this.matchSubcategory(category, normalizedInput);
      
      if (subMatch) {
        const tools = categoryMap[category].subcategories![subMatch];
        return {
          strategy: 'subcategory',
          confidence: 0.9,
          category,
          subcategory: subMatch,
          tools,
          tokenEstimate: tools.length * 80,
        };
      }
      
      const config = categoryMap[category];
      return {
        strategy: 'single-category',
        confidence: 0.85,
        category,
        tools: config.tools_list || [],
        tokenEstimate: config.tokens,
      };
    }

    if (matchedCategories.length <= 3) {
      const tools = this.getMultiCategoryTools(matchedCategories);
      return {
        strategy: 'multi-category',
        confidence: 0.75,
        categories: matchedCategories,
        tools,
        tokenEstimate: this.estimateMultiCategoryTokens(matchedCategories),
      };
    }

    return {
      strategy: 'clarify',
      confidence: 0,
      tokenEstimate: 0,
      message: '您的请求涉及多个领域，请明确主要意图：',
      options: matchedCategories.slice(0, 5).map(c => ({
        category: c,
        name: categoryMap[c].name,
        description: `操作${categoryMap[c].name}相关资源`,
      })),
    };
  }

  private matchCrossCategoryWorkflow(input: string): { workflow?: string; confidence: number } {
    for (const [workflow, config] of Object.entries(crossCategoryWorkflows)) {
      for (const keyword of config.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          return { workflow, confidence: 0.9 };
        }
      }
    }
    return { confidence: 0 };
  }

  private matchCategories(input: string): string[] {
    const scores: Record<string, number> = {};
    
    for (const [category, config] of Object.entries(categoryMap)) {
      let score = 0;
      
      for (const keyword of config.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
        }
      }
      
      if (category === 'database' && config.engines) {
        for (const [engine, engineConfig] of Object.entries(config.engines)) {
          for (const kw of engineConfig.keywords) {
            if (input.includes(kw.toLowerCase())) {
              score += 2;
            }
          }
        }
      }
      
      if (score > 0) {
        scores[category] = score;
      }
    }
    
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);
  }

  private matchSubcategory(category: string, input: string): string | null {
    const config = categoryMap[category];
    if (!config.subcategories) return null;
    
    for (const sub of Object.keys(config.subcategories)) {
      if (input.includes(sub.toLowerCase())) {
        return sub;
      }
    }
    
    if (category === 'application') {
      if (input.includes('github') || input.includes('gitlab') || input.includes('git')) return 'source';
      if (input.includes('env') || input.includes('环境变量')) return 'config';
      if (input.includes('start') || input.includes('stop') || input.includes('deploy')) return 'lifecycle';
      if (input.includes('log') || input.includes('监控') || input.includes('状态')) return 'monitoring';
    }
    
    return null;
  }

  private getMultiCategoryTools(categories: string[]): string[] {
    const tools: string[] = [];
    for (const cat of categories) {
      const config = categoryMap[cat];
      if (config.tools_list) {
        tools.push(...config.tools_list);
      }
    }
    return [...new Set(tools)];
  }

  private estimateMultiCategoryTokens(categories: string[]): number {
    return categories.reduce((sum, cat) => sum + categoryMap[cat].tokens, 0);
  }
}
