// Reusable Layout Components for ThreatScope AI

class LayoutManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('threat-engine')) return 'threat-engine';
        if (path.includes('attack-surface')) return 'attack-surface';
        if (path.includes('simulation')) return 'simulation';
        return 'threat-engine'; // default
    }

    createTopBar() {
        return `
            <!-- Top Bar -->
            <header class="top-bar">
                <div class="top-bar-content">
                    <div class="top-bar-left">
                        <button class="mobile-menu-btn" onclick="toggleSidebar()" style="display: none;">
                            <i class="fas fa-bars"></i>
                        </button>
                        <h1 class="top-logo">
                            <i class="fas fa-brain"></i>
                            <span class="logo-text">ThreatScope AI</span>
                        </h1>
                    </div>
                    <div class="top-bar-right">
                        <button class="account-icon">
                            <i class="fas fa-user-circle"></i>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    createSidebar() {
        const navigationItems = [
            {
                id: 'threat-engine',
                href: 'threat-engine.html',
                icon: 'fas fa-robot',
                title: 'AI Threat Engine'
            },
            {
                id: 'attack-surface',
                href: 'attack-surface.html',
                icon: 'fas fa-project-diagram',
                title: 'Attack Surface Map'
            },
            {
                id: 'simulation',
                href: 'simulation.html',
                icon: 'fas fa-play-circle',
                title: 'What If? Simulation'
            }
        ];

        const navItems = navigationItems.map(item => `
            <a href="${item.href}" class="feature-btn ${this.currentPage === item.id ? 'active' : ''}">
                <i class="${item.icon}"></i>
                <span>${item.title}</span>
            </a>
        `).join('');

        return `
            <!-- Sidebar -->
            <aside class="sidebar">
                <!-- Feature Navigation -->
                <nav class="feature-nav">
                    ${navItems}
                </nav>
            </aside>
        `;
    }

    injectLayout() {
        // Inject topbar
        const topBarContainer = document.getElementById('topbar-container');
        if (topBarContainer) {
            topBarContainer.innerHTML = this.createTopBar();
        }

        // Inject sidebar
        const sidebarContainer = document.getElementById('sidebar-container');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = this.createSidebar();
        }
    }

    // Mobile sidebar toggle function
    static toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    }
}

// Global toggle function for mobile
function toggleSidebar() {
    LayoutManager.toggleSidebar();
}

// Auto-initialize layout when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const layoutManager = new LayoutManager();
    layoutManager.injectLayout();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayoutManager;
}
