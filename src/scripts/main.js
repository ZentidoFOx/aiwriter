// Main JavaScript file for AI Writer

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons
            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // AI Writer Generator functionality
    const generateButton = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const toneSelect = document.getElementById('tone-select');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsDropdown = document.getElementById('settings-dropdown');
    const resultArea = document.getElementById('result-area');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (generateButton && promptInput) {
        generateButton.addEventListener('click', function() {
            const prompt = promptInput.value.trim();
            const tone = toneSelect ? toneSelect.value : 'professional';
            const model = document.querySelector('input[name="model"]:checked')?.value || 'gpt-4';
            const language = document.querySelector('input[name="language"]:checked')?.value || 'auto';

            if (!prompt) {
                showNotification('Por favor ingresa un prompt para generar contenido.', 'warning');
                return;
            }

            generateContent(prompt, tone, model, language);
        });

        // Enter key to generate
        promptInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateButton.click();
            }
        });
    }

    // Settings dropdown functionality
    if (settingsBtn && settingsDropdown) {
        const closeSettingsBtn = document.getElementById('close-settings');
        
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsDropdown.classList.toggle('hidden');
            
            // Add visual feedback to settings button
            if (!settingsDropdown.classList.contains('hidden')) {
                settingsBtn.style.transform = 'scale(0.95)';
                settingsBtn.style.backgroundColor = '#f0fdf4';
                setTimeout(() => {
                    settingsBtn.style.transform = '';
                    settingsBtn.style.backgroundColor = '';
                }, 150);
            }
        });

        // Close button functionality
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                settingsDropdown.classList.add('hidden');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsDropdown.classList.add('hidden');
            }
        });

        // Prevent dropdown from closing when clicking inside
        settingsDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Enhanced radio button interactions
        const radioButtons = settingsDropdown.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                // Add ripple effect
                const label = this.closest('label');
                if (label) {
                    label.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        label.style.transform = '';
                    }, 100);
                }
            });
        });
    }

    // Copy to clipboard functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn')) {
            const textToCopy = e.target.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        }
    });

    // Tool cards interaction
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            if (toolName) {
                selectTool(toolName);
            }
        });
    });

    // Quick action buttons (updated for new class)
    document.querySelectorAll('.quick-action-enhanced').forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            if (prompt && promptInput) {
                promptInput.value = prompt;
                promptInput.focus();
                
                // Add enhanced visual feedback
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = '0 8px 25px -8px rgba(0, 0, 0, 0.3)';
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 200);
            }
        });
    });

    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterTools(category);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Generate content function
async function generateContent(prompt, tone = 'professional', model = 'gpt-4', language = 'es') {
    const generateButton = document.getElementById('generate-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultArea = document.getElementById('result-area');

    // Show loading state
    if (generateButton) {
        generateButton.disabled = true;
        generateButton.innerHTML = '<span class="spinner mr-2"></span>Generating...';
    }

    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }

    try {
        // Simulate API call (replace with actual API integration)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock generated content
        const mockContent = generateMockContent(prompt, tone, model, language);
        
        if (resultArea) {
            resultArea.innerHTML = `
                <div class="bg-white rounded-lg p-6 shadow-soft border border-gray-200">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Contenido Generado</h3>
                            <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span class="flex items-center space-x-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                    </svg>
                                    <span>${model.toUpperCase()}</span>
                                </span>
                                <span class="flex items-center space-x-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                                    </svg>
                                    <span>${language.toUpperCase()}</span>
                                </span>
                                <span class="flex items-center space-x-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v11.586l-2-2V4a1 1 0 00-1-1H8a1 1 0 00-1 1v8.586l-2 2V4a1 1 0 011-1z"></path>
                                    </svg>
                                    <span>${tone}</span>
                                </span>
                            </div>
                        </div>
                        <button class="copy-btn btn-secondary text-sm py-2 px-4" data-copy="${mockContent}">
                            Copiar
                        </button>
                    </div>
                    <div class="prose max-w-none">
                        <p class="text-gray-700 leading-relaxed">${mockContent}</p>
                    </div>
                </div>
            `;
            resultArea.classList.remove('hidden');
        }

        showNotification('Content generated successfully!', 'success');

    } catch (error) {
        console.error('Error generating content:', error);
        showNotification('Error generating content. Please try again.', 'error');
    } finally {
        // Reset button state
        if (generateButton) {
            generateButton.disabled = false;
            generateButton.innerHTML = 'Generate';
        }

        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
        }
    }
}

// Generate mock content based on prompt, tone, model and language
function generateMockContent(prompt, tone, model = 'gpt-4', language = 'auto') {
    const toneStyles = {
        professional: "In today's dynamic business environment, ",
        casual: "Hey there! Let me tell you about ",
        creative: "Imagine a world where ",
        academic: "Research indicates that ",
        persuasive: "Consider this compelling fact: "
    };

    const starter = toneStyles[tone] || toneStyles.professional;
    
    return `${starter}${prompt.toLowerCase()} represents a significant opportunity for growth and innovation. This comprehensive approach ensures that all stakeholders benefit from strategic implementation while maintaining the highest standards of quality and efficiency. The methodology outlined here provides a framework for sustainable success and measurable outcomes that align with organizational objectives.`;
}

// Copy to clipboard function
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showNotification('Failed to copy text', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-emerald-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Filter tools by category
function filterTools(category) {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('animate-fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// Select tool
function selectTool(toolName) {
    console.log(`Selected tool: ${toolName}`);
    showNotification(`Selected ${toolName}`, 'info');
    
    // You can add more functionality here, like:
    // - Update the main generator interface
    // - Load tool-specific options
    // - Navigate to tool-specific page
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});
