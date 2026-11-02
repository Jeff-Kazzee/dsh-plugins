// H4X0R Themes v2, browser half.
// Built into client.js by `node build.mjs`. The markers below are replaced at
// build time with the palette data, palette-core.mjs and pixel-theme.mjs.
window.__ModuleLoader__.load({
  id: '@local/h4x0r-themes',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const THEME_DATA = {"packs":[{"id":"h4x0r","name":"H4X0R","tagline":"Six hacker palettes","themes":[{"id":"h4x0r-phosphor","name":"Phosphor","colorScheme":"dark","tagline":"Phosphor green CRT terminal","description":"Green phosphor CRT terminal with a near-black green canvas and soft non-white text.","tokens":{"--dsw-alias-bg-base":"#070f0a","--dsw-alias-bg-document-preview":"#070f0a","--dsw-alias-bg-document-selection":"rgba(98, 224, 143, 0.4)","--dsw-alias-label-document-preview":"#93ab99","--dsw-alias-bg-layer-1":"#121b15","--dsw-alias-bg-layer-2":"#1c2620","--dsw-alias-bg-layer-3":"#26312a","--dsw-alias-bg-mask-1":"rgba(2, 4, 3, 0.24)","--dsw-alias-bg-mask-2":"rgba(2, 4, 3, 0.12)","--dsw-alias-bg-mask-3":"rgba(2, 4, 3, 0.48)","--dsw-alias-bg-mask-photo":"rgba(2, 4, 3, 0.88)","--dsw-alias-bg-mask-drop":"rgba(63, 76, 67, 0.7)","--dsw-alias-bg-module-platform":"#26312a","--dsw-alias-bg-multi-select":"#0f1812","--dsw-alias-bg-overlay":"#3f4c43","--dsw-alias-bg-skeleton":"rgba(207, 232, 215, 0.06)","--dsw-alias-border-inverted2":"rgba(207, 232, 215, 0.08)","--dsw-alias-border-inverted":"rgba(207, 232, 215, 0.06)","--dsw-alias-border-l1":"rgba(207, 232, 215, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(207, 232, 215, 0.08)","--dsw-alias-border-l2":"rgba(207, 232, 215, 0.13)","--dsw-alias-border-l3":"rgba(207, 232, 215, 0.18)","--dsw-alias-border-l4":"rgba(207, 232, 215, 0.23)","--dsw-alias-brand-primary-invert":"#c4dfcb","--dsw-alias-brand-primary-new-colorprimary-new-color":"#4fd0a2","--dsw-alias-brand-primary":"#1b8549","--dsw-alias-brand-text":"#7ce6a0","--dsw-alias-button-contrast-fill":"#d8ead9","--dsw-alias-button-elevated-fill":"#26312a","--dsw-alias-button-floating-fill":"#1c2620","--dsw-alias-button-floating-hover":"#26312a","--dsw-alias-button-ghost-active-border":"#6b7c71","--dsw-alias-button-ghost-active-fill":"#26312a","--dsw-alias-button-ghost-active-hover":"#37433b","--dsw-alias-button-info-fill":"#23857a","--dsw-alias-button-info-hover":"#45998d","--dsw-alias-button-primary-dimmed":"#13532f","--dsw-alias-button-primary-fill":"#1b8549","--dsw-alias-button-primary-hover":"#2fa864","--dsw-alias-button-tool-bar-fill-invisible":"rgba(67, 80, 72, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(67, 80, 72, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(67, 80, 72, 0.6)","--dsw-alias-interactive-bg-active":"rgba(27, 133, 73, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(27, 133, 73, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(207, 83, 71, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#26312a","--dsw-alias-interactive-bg-hover":"rgba(207, 232, 215, 0.07)","--dsw-alias-label-caption":"#5b7261","--dsw-alias-label-deep-diving":"#67e3a2","--dsw-alias-label-deep-diving-shimmer":"rgba(103, 227, 162, 0.35)","--dsw-alias-label-dimmed":"#3a4c40","--dsw-alias-label-primary-bluish":"#c4dfcb","--dsw-alias-label-primary-dimmed":"#adc6b4","--dsw-alias-label-primary-foreground":"#04140a","--dsw-alias-label-primary-inverted":"#232d27","--dsw-alias-label-primary":"#c4dfcb","--dsw-alias-label-secondary":"#93ab99","--dsw-alias-label-shimmer":"rgba(196, 223, 203, 0.32)","--dsw-alias-label-tertiary":"#748c7a","--dsw-alias-menu-icon":"#a9c2b0","--dsw-alias-link":"#6ee094","--dsw-alias-markdown-citation":"#1c2620","--dsw-alias-markdown-code-block-banner":"#161f19","--dsw-alias-markdown-code-block":"#0e1711","--dsw-alias-markdown-code-segment-selected":"#2d3831","--dsw-alias-markdown-code-segment-unselected":"#0e1711","--dsw-alias-markdown-inline-code":"#19231c","--dsw-alias-markdown-placeholder":"#1c2620","--dsw-alias-markdown-tag":"#1b251f","--dsw-alias-scrollbar-bg-l1":"#2f3a33","--dsw-alias-scrollbar-bg-l2":"#435048","--dsw-alias-scrollbar-hover-l1":"#4b5950","--dsw-alias-scrollbar-hover-l2":"#5f6e64","--dsw-alias-state-business-primary":"#3fc47c","--dsw-alias-state-business-tertiary":"rgba(63, 196, 124, 0.14)","--dsw-alias-code-diff-added":"rgba(53, 176, 106, 0.1)","--dsw-alias-code-diff-deleted":"rgba(207, 83, 71, 0.1)","--dsw-alias-file-diff-added-bg":"#0e2919","--dsw-alias-file-diff-added-gutter":"#0b1d12","--dsw-alias-file-diff-added-marker":"#62e08f","--dsw-alias-file-diff-deleted-bg":"#271a14","--dsw-alias-file-diff-deleted-gutter":"#191510","--dsw-alias-file-diff-deleted-marker":"#f07a6c","--dsw-alias-state-error-primary":"#cf5347","--dsw-alias-state-error-secondary":"#f07a6c","--dsw-alias-state-idle-primary":"#4b5950","--dsw-alias-state-success-primary":"#35b06a","--dsw-alias-state-success-secondary":"#62e08f","--dsw-alias-state-success-tertiary":"#0d2416","--dsw-alias-state-warn-label":"#d9a441","--dsw-alias-state-warn-primary":"#c08a2e","--dsw-alias-state-warn-secondary":"#e8b455","--dsw-alias-state-warn-tertiary":"#1f1f0f","--dsw-alias-switch-thumb":"#b9d8c0","--dsw-alias-toast-bg":"#1f2f25","--dsw-alias-toast-label":"#e2f2e6","--dsw-alias-tooltip-bg":"#223329","--dsw-alias-tooltip-key-bg":"#4a5850","--dsw-alias-turn-trigger-bg":"rgba(207, 232, 215, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(207, 232, 215, 0.11)","--dsw-specific-bubble-highlight":"#25392d","--dsw-specific-bubble":"#1c2c22","--dsw-specific-input-major":"#1c2620","--dsw-specific-login-input":"#0e1711","--dsw-menu-surface-fill":"rgba(51, 63, 55, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(59, 71, 63, 0.94)","--dsw-specific-menu":"rgba(51, 63, 55, 0.46)","--dsw-specific-selector":"#26312a","--dsw-specific-sidebar-fill":"#101913","--dsw-specific-sidebar-nav-item-active-accent":"#1c3527","--dsw-specific-sidebar-nav-item-active":"#26312a","--dsw-specific-sidebar-nav-item-hover":"#1c2620","--dsw-specific-tip":"#26312a","--dsw-alias-settings-card-fill":"#1c2620","--dsw-alias-settings-card-stroke":"rgba(207, 232, 215, 0.23)","--dsw-alias-onboarding-accent":"#59d99a","--dsw-alias-onboarding-card-fill":"rgba(63, 76, 67, 0.8)","--dsw-alias-onboarding-secondary-fill":"#37433b","--dsw-alias-onboarding-checkbox-border":"rgba(207, 232, 215, 0.13)"},"check":{"labelPrimaryOnBase":13.65,"labelSecondaryOnBase":7.88,"brandOnBase":4.16,"labelOnBrand":3.28,"stateOnBase":4.6,"failures":[]}},{"id":"h4x0r-void","name":"Void","colorScheme":"dark","tagline":"Obsidian glass, electric violet","description":"Obsidian dark tech with electric violet as the single accent and cool neutral text.","tokens":{"--dsw-alias-bg-base":"#0a0910","--dsw-alias-bg-document-preview":"#0a0910","--dsw-alias-bg-document-selection":"rgba(179, 154, 255, 0.4)","--dsw-alias-label-document-preview":"#a9a4c0","--dsw-alias-bg-layer-1":"#15141d","--dsw-alias-bg-layer-2":"#201e29","--dsw-alias-bg-layer-3":"#2a2835","--dsw-alias-bg-mask-1":"rgba(3, 3, 4, 0.24)","--dsw-alias-bg-mask-2":"rgba(3, 3, 4, 0.12)","--dsw-alias-bg-mask-3":"rgba(3, 3, 4, 0.48)","--dsw-alias-bg-mask-photo":"rgba(3, 3, 4, 0.88)","--dsw-alias-bg-mask-drop":"rgba(68, 65, 83, 0.7)","--dsw-alias-bg-module-platform":"#2a2835","--dsw-alias-bg-multi-select":"#12111a","--dsw-alias-bg-overlay":"#444153","--dsw-alias-bg-skeleton":"rgba(217, 210, 255, 0.06)","--dsw-alias-border-inverted2":"rgba(217, 210, 255, 0.08)","--dsw-alias-border-inverted":"rgba(217, 210, 255, 0.06)","--dsw-alias-border-l1":"rgba(217, 210, 255, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(217, 210, 255, 0.08)","--dsw-alias-border-l2":"rgba(217, 210, 255, 0.13)","--dsw-alias-border-l3":"rgba(217, 210, 255, 0.18)","--dsw-alias-border-l4":"rgba(217, 210, 255, 0.23)","--dsw-alias-brand-primary-invert":"#e4e0f2","--dsw-alias-brand-primary-new-colorprimary-new-color":"#8a7bff","--dsw-alias-brand-primary":"#7448dd","--dsw-alias-brand-text":"#c3b2ff","--dsw-alias-button-contrast-fill":"#e9e5f7","--dsw-alias-button-elevated-fill":"#2a2835","--dsw-alias-button-floating-fill":"#201e29","--dsw-alias-button-floating-hover":"#2a2835","--dsw-alias-button-ghost-active-border":"#726e88","--dsw-alias-button-ghost-active-fill":"#2a2835","--dsw-alias-button-ghost-active-hover":"#3c3949","--dsw-alias-button-info-fill":"#4a68c4","--dsw-alias-button-info-hover":"#677dd0","--dsw-alias-button-primary-dimmed":"#472e87","--dsw-alias-button-primary-fill":"#7448dd","--dsw-alias-button-primary-hover":"#8a63f0","--dsw-alias-button-tool-bar-fill-invisible":"rgba(72, 69, 88, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(72, 69, 88, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(72, 69, 88, 0.6)","--dsw-alias-interactive-bg-active":"rgba(116, 72, 221, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(116, 72, 221, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(212, 80, 106, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#2a2835","--dsw-alias-interactive-bg-hover":"rgba(217, 210, 255, 0.07)","--dsw-alias-label-caption":"#6a647e","--dsw-alias-label-deep-diving":"#a98cff","--dsw-alias-label-deep-diving-shimmer":"rgba(169, 140, 255, 0.35)","--dsw-alias-label-dimmed":"#46425a","--dsw-alias-label-primary-bluish":"#e4e0f2","--dsw-alias-label-primary-dimmed":"#cac6d7","--dsw-alias-label-primary-foreground":"#efeaff","--dsw-alias-label-primary-inverted":"#272531","--dsw-alias-label-primary":"#e4e0f2","--dsw-alias-label-secondary":"#a9a4c0","--dsw-alias-label-shimmer":"rgba(228, 224, 242, 0.32)","--dsw-alias-label-tertiary":"#827d99","--dsw-alias-menu-icon":"#c4bfd7","--dsw-alias-link":"#b49cff","--dsw-alias-markdown-citation":"#201e29","--dsw-alias-markdown-code-block-banner":"#1a1822","--dsw-alias-markdown-code-block":"#111018","--dsw-alias-markdown-code-segment-selected":"#312f3d","--dsw-alias-markdown-code-segment-unselected":"#111018","--dsw-alias-markdown-inline-code":"#1d1b26","--dsw-alias-markdown-placeholder":"#201e29","--dsw-alias-markdown-tag":"#1f1d28","--dsw-alias-scrollbar-bg-l1":"#333140","--dsw-alias-scrollbar-bg-l2":"#484558","--dsw-alias-scrollbar-hover-l1":"#504d61","--dsw-alias-scrollbar-hover-l2":"#656179","--dsw-alias-state-business-primary":"#8a63f0","--dsw-alias-state-business-tertiary":"rgba(138, 99, 240, 0.14)","--dsw-alias-code-diff-added":"rgba(47, 164, 127, 0.1)","--dsw-alias-code-diff-deleted":"rgba(212, 80, 106, 0.1)","--dsw-alias-file-diff-added-bg":"#102222","--dsw-alias-file-diff-added-gutter":"#0d171a","--dsw-alias-file-diff-added-marker":"#5fd6ac","--dsw-alias-file-diff-deleted-bg":"#2a141e","--dsw-alias-file-diff-deleted-gutter":"#1c0f18","--dsw-alias-file-diff-deleted-marker":"#f27a92","--dsw-alias-state-error-primary":"#d4506a","--dsw-alias-state-error-secondary":"#f27a92","--dsw-alias-state-idle-primary":"#504d61","--dsw-alias-state-success-primary":"#2fa47f","--dsw-alias-state-success-secondary":"#5fd6ac","--dsw-alias-state-success-tertiary":"#0f1d1e","--dsw-alias-state-warn-label":"#d8ad55","--dsw-alias-state-warn-primary":"#c79a45","--dsw-alias-state-warn-secondary":"#e8bf6a","--dsw-alias-state-warn-tertiary":"#231c17","--dsw-alias-switch-thumb":"#c9c3de","--dsw-alias-toast-bg":"#262233","--dsw-alias-toast-label":"#ece8f8","--dsw-alias-tooltip-bg":"#2a2538","--dsw-alias-tooltip-key-bg":"#504c5c","--dsw-alias-turn-trigger-bg":"rgba(217, 210, 255, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(217, 210, 255, 0.11)","--dsw-specific-bubble-highlight":"#312b46","--dsw-specific-bubble":"#252134","--dsw-specific-input-major":"#201e29","--dsw-specific-login-input":"#111018","--dsw-menu-surface-fill":"rgba(56, 53, 69, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(64, 61, 78, 0.94)","--dsw-specific-menu":"rgba(56, 53, 69, 0.46)","--dsw-specific-selector":"#2a2835","--dsw-specific-sidebar-fill":"#13121b","--dsw-specific-sidebar-nav-item-active-accent":"#2d2546","--dsw-specific-sidebar-nav-item-active":"#2a2835","--dsw-specific-sidebar-nav-item-hover":"#201e29","--dsw-specific-tip":"#2a2835","--dsw-alias-settings-card-fill":"#201e29","--dsw-alias-settings-card-stroke":"rgba(217, 210, 255, 0.23)","--dsw-alias-onboarding-accent":"#a98cff","--dsw-alias-onboarding-card-fill":"rgba(68, 65, 83, 0.8)","--dsw-alias-onboarding-secondary-fill":"#3c3949","--dsw-alias-onboarding-checkbox-border":"rgba(217, 210, 255, 0.13)"},"check":{"labelPrimaryOnBase":15.33,"labelSecondaryOnBase":8.27,"brandOnBase":3.51,"labelOnBrand":4.37,"stateOnBase":4.87,"failures":[]}},{"id":"h4x0r-ice","name":"Ice","colorScheme":"dark","tagline":"Cold cyan cyberdeck","description":"Cold cyan cyberdeck with steel blue supports and crisp frost surfaces.","tokens":{"--dsw-alias-bg-base":"#070d12","--dsw-alias-bg-document-preview":"#070d12","--dsw-alias-bg-document-selection":"rgba(122, 212, 238, 0.4)","--dsw-alias-label-document-preview":"#9db6c6","--dsw-alias-bg-layer-1":"#12191e","--dsw-alias-bg-layer-2":"#1c242a","--dsw-alias-bg-layer-3":"#262e35","--dsw-alias-bg-mask-1":"rgba(2, 4, 5, 0.24)","--dsw-alias-bg-mask-2":"rgba(2, 4, 5, 0.12)","--dsw-alias-bg-mask-3":"rgba(2, 4, 5, 0.48)","--dsw-alias-bg-mask-photo":"rgba(2, 4, 5, 0.88)","--dsw-alias-bg-mask-drop":"rgba(63, 73, 81, 0.7)","--dsw-alias-bg-module-platform":"#262e35","--dsw-alias-bg-multi-select":"#0f161b","--dsw-alias-bg-overlay":"#3f4951","--dsw-alias-bg-skeleton":"rgba(207, 228, 242, 0.06)","--dsw-alias-border-inverted2":"rgba(207, 228, 242, 0.08)","--dsw-alias-border-inverted":"rgba(207, 228, 242, 0.06)","--dsw-alias-border-l1":"rgba(207, 228, 242, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(207, 228, 242, 0.08)","--dsw-alias-border-l2":"rgba(207, 228, 242, 0.13)","--dsw-alias-border-l3":"rgba(207, 228, 242, 0.18)","--dsw-alias-border-l4":"rgba(207, 228, 242, 0.23)","--dsw-alias-brand-primary-invert":"#d3e7f2","--dsw-alias-brand-primary-new-colorprimary-new-color":"#5f9fe0","--dsw-alias-brand-primary":"#17789b","--dsw-alias-brand-text":"#9fdcf0","--dsw-alias-button-contrast-fill":"#dcecf5","--dsw-alias-button-elevated-fill":"#262e35","--dsw-alias-button-floating-fill":"#1c242a","--dsw-alias-button-floating-hover":"#262e35","--dsw-alias-button-ghost-active-border":"#6b7982","--dsw-alias-button-ghost-active-fill":"#262e35","--dsw-alias-button-ghost-active-hover":"#374148","--dsw-alias-button-info-fill":"#2f5f88","--dsw-alias-button-info-hover":"#4f7a9d","--dsw-alias-button-primary-dimmed":"#104b61","--dsw-alias-button-primary-fill":"#17789b","--dsw-alias-button-primary-hover":"#1f93bd","--dsw-alias-button-tool-bar-fill-invisible":"rgba(67, 78, 85, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(67, 78, 85, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(67, 78, 85, 0.6)","--dsw-alias-interactive-bg-active":"rgba(23, 120, 155, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(23, 120, 155, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(207, 85, 72, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#262e35","--dsw-alias-interactive-bg-hover":"rgba(207, 228, 242, 0.07)","--dsw-alias-label-caption":"#637c8b","--dsw-alias-label-deep-diving":"#7fd0e8","--dsw-alias-label-deep-diving-shimmer":"rgba(127, 208, 232, 0.35)","--dsw-alias-label-dimmed":"#40525e","--dsw-alias-label-primary-bluish":"#d3e7f2","--dsw-alias-label-primary-dimmed":"#bbcdd7","--dsw-alias-label-primary-foreground":"#e9f6fc","--dsw-alias-label-primary-inverted":"#232b31","--dsw-alias-label-primary":"#d3e7f2","--dsw-alias-label-secondary":"#9db6c6","--dsw-alias-label-shimmer":"rgba(211, 231, 242, 0.32)","--dsw-alias-label-tertiary":"#7b95a5","--dsw-alias-menu-icon":"#b5ccda","--dsw-alias-link":"#7ad4ee","--dsw-alias-markdown-citation":"#1c242a","--dsw-alias-markdown-code-block-banner":"#161d23","--dsw-alias-markdown-code-block":"#0e151a","--dsw-alias-markdown-code-segment-selected":"#2d363d","--dsw-alias-markdown-code-segment-unselected":"#0e151a","--dsw-alias-markdown-inline-code":"#192026","--dsw-alias-markdown-placeholder":"#1c242a","--dsw-alias-markdown-tag":"#1b2328","--dsw-alias-scrollbar-bg-l1":"#2f383f","--dsw-alias-scrollbar-bg-l2":"#434e55","--dsw-alias-scrollbar-hover-l1":"#4b565e","--dsw-alias-scrollbar-hover-l2":"#5f6c75","--dsw-alias-state-business-primary":"#3fa9cf","--dsw-alias-state-business-tertiary":"rgba(63, 169, 207, 0.14)","--dsw-alias-code-diff-added":"rgba(47, 158, 120, 0.1)","--dsw-alias-code-diff-deleted":"rgba(207, 85, 72, 0.1)","--dsw-alias-file-diff-added-bg":"#0d2422","--dsw-alias-file-diff-added-gutter":"#0a1a1b","--dsw-alias-file-diff-added-marker":"#57d6a8","--dsw-alias-file-diff-deleted-bg":"#27191b","--dsw-alias-file-diff-deleted-gutter":"#191417","--dsw-alias-file-diff-deleted-marker":"#ef7d6f","--dsw-alias-state-error-primary":"#cf5548","--dsw-alias-state-error-secondary":"#ef7d6f","--dsw-alias-state-idle-primary":"#4b565e","--dsw-alias-state-success-primary":"#2f9e78","--dsw-alias-state-success-secondary":"#57d6a8","--dsw-alias-state-success-tertiary":"#0c201f","--dsw-alias-state-warn-label":"#d3a850","--dsw-alias-state-warn-primary":"#c29540","--dsw-alias-state-warn-secondary":"#e6bb66","--dsw-alias-state-warn-tertiary":"#1f1f18","--dsw-alias-switch-thumb":"#b4cfdf","--dsw-alias-toast-bg":"#1c2c36","--dsw-alias-toast-label":"#e4f0f7","--dsw-alias-tooltip-bg":"#1e303b","--dsw-alias-tooltip-key-bg":"#47555e","--dsw-alias-turn-trigger-bg":"rgba(207, 228, 242, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(207, 228, 242, 0.11)","--dsw-specific-bubble-highlight":"#25353f","--dsw-specific-bubble":"#1c2931","--dsw-specific-input-major":"#1c242a","--dsw-specific-login-input":"#0e151a","--dsw-menu-surface-fill":"rgba(51, 60, 67, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(59, 69, 76, 0.94)","--dsw-specific-menu":"rgba(51, 60, 67, 0.46)","--dsw-specific-selector":"#262e35","--dsw-specific-sidebar-fill":"#10171c","--dsw-specific-sidebar-nav-item-active-accent":"#1b313c","--dsw-specific-sidebar-nav-item-active":"#262e35","--dsw-specific-sidebar-nav-item-hover":"#1c242a","--dsw-specific-tip":"#262e35","--dsw-alias-settings-card-fill":"#1c242a","--dsw-alias-settings-card-stroke":"rgba(207, 228, 242, 0.23)","--dsw-alias-onboarding-accent":"#57b6e8","--dsw-alias-onboarding-card-fill":"rgba(63, 73, 81, 0.8)","--dsw-alias-onboarding-secondary-fill":"#374148","--dsw-alias-onboarding-checkbox-border":"rgba(207, 228, 242, 0.13)"},"check":{"labelPrimaryOnBase":15.33,"labelSecondaryOnBase":9.24,"brandOnBase":3.9,"labelOnBrand":3.93,"stateOnBase":4.69,"failures":[]}},{"id":"h4x0r-redline","name":"Redline","colorScheme":"dark","tagline":"Red-team ops, ember light","description":"Red-team operations console with ember red accent and amber warning states.","tokens":{"--dsw-alias-bg-base":"#0c0a0a","--dsw-alias-bg-document-preview":"#0c0a0a","--dsw-alias-bg-document-selection":"rgba(255, 143, 110, 0.4)","--dsw-alias-label-document-preview":"#b9a49d","--dsw-alias-bg-layer-1":"#181515","--dsw-alias-bg-layer-2":"#231f1f","--dsw-alias-bg-layer-3":"#2e2a29","--dsw-alias-bg-mask-1":"rgba(3, 3, 3, 0.24)","--dsw-alias-bg-mask-2":"rgba(3, 3, 3, 0.12)","--dsw-alias-bg-mask-3":"rgba(3, 3, 3, 0.48)","--dsw-alias-bg-mask-photo":"rgba(3, 3, 3, 0.88)","--dsw-alias-bg-mask-drop":"rgba(73, 67, 65, 0.7)","--dsw-alias-bg-module-platform":"#2e2a29","--dsw-alias-bg-multi-select":"#151212","--dsw-alias-bg-overlay":"#494341","--dsw-alias-bg-skeleton":"rgba(230, 214, 207, 0.06)","--dsw-alias-border-inverted2":"rgba(230, 214, 207, 0.08)","--dsw-alias-border-inverted":"rgba(230, 214, 207, 0.06)","--dsw-alias-border-l1":"rgba(230, 214, 207, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(230, 214, 207, 0.08)","--dsw-alias-border-l2":"rgba(230, 214, 207, 0.13)","--dsw-alias-border-l3":"rgba(230, 214, 207, 0.18)","--dsw-alias-border-l4":"rgba(230, 214, 207, 0.23)","--dsw-alias-brand-primary-invert":"#eed9d2","--dsw-alias-brand-primary-new-colorprimary-new-color":"#e0a13f","--dsw-alias-brand-primary":"#c24532","--dsw-alias-brand-text":"#ffb09a","--dsw-alias-button-contrast-fill":"#f0ddd6","--dsw-alias-button-elevated-fill":"#2e2a29","--dsw-alias-button-floating-fill":"#231f1f","--dsw-alias-button-floating-hover":"#2e2a29","--dsw-alias-button-ghost-active-border":"#79706d","--dsw-alias-button-ghost-active-fill":"#2e2a29","--dsw-alias-button-ghost-active-hover":"#403b39","--dsw-alias-button-info-fill":"#4a6b8f","--dsw-alias-button-info-hover":"#69809c","--dsw-alias-button-primary-dimmed":"#762c21","--dsw-alias-button-primary-fill":"#c24532","--dsw-alias-button-primary-hover":"#d95a41","--dsw-alias-button-tool-bar-fill-invisible":"rgba(77, 71, 69, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(77, 71, 69, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(77, 71, 69, 0.6)","--dsw-alias-interactive-bg-active":"rgba(194, 69, 50, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(194, 69, 50, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(232, 82, 74, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#2e2a29","--dsw-alias-interactive-bg-hover":"rgba(230, 214, 207, 0.07)","--dsw-alias-label-caption":"#7a6660","--dsw-alias-label-deep-diving":"#ff9f7f","--dsw-alias-label-deep-diving-shimmer":"rgba(255, 159, 127, 0.35)","--dsw-alias-label-dimmed":"#4d3e3a","--dsw-alias-label-primary-bluish":"#eed9d2","--dsw-alias-label-primary-dimmed":"#d3c0ba","--dsw-alias-label-primary-foreground":"#f8e6df","--dsw-alias-label-primary-inverted":"#2b2726","--dsw-alias-label-primary":"#eed9d2","--dsw-alias-label-secondary":"#b9a49d","--dsw-alias-label-shimmer":"rgba(238, 217, 210, 0.32)","--dsw-alias-label-tertiary":"#947f79","--dsw-alias-menu-icon":"#d1bcb5","--dsw-alias-link":"#ff9d80","--dsw-alias-markdown-citation":"#231f1f","--dsw-alias-markdown-code-block-banner":"#1c1919","--dsw-alias-markdown-code-block":"#141111","--dsw-alias-markdown-code-segment-selected":"#35312f","--dsw-alias-markdown-code-segment-unselected":"#141111","--dsw-alias-markdown-inline-code":"#201c1c","--dsw-alias-markdown-placeholder":"#231f1f","--dsw-alias-markdown-tag":"#221e1e","--dsw-alias-scrollbar-bg-l1":"#383331","--dsw-alias-scrollbar-bg-l2":"#4d4745","--dsw-alias-scrollbar-hover-l1":"#564f4d","--dsw-alias-scrollbar-hover-l2":"#6c6461","--dsw-alias-state-business-primary":"#e0a13f","--dsw-alias-state-business-tertiary":"rgba(224, 161, 63, 0.14)","--dsw-alias-code-diff-added":"rgba(79, 158, 106, 0.1)","--dsw-alias-code-diff-deleted":"rgba(232, 82, 74, 0.1)","--dsw-alias-file-diff-added-bg":"#172219","--dsw-alias-file-diff-added-gutter":"#121712","--dsw-alias-file-diff-added-marker":"#79c98f","--dsw-alias-file-diff-deleted-bg":"#2f1614","--dsw-alias-file-diff-deleted-gutter":"#1f1110","--dsw-alias-file-diff-deleted-marker":"#ff7a6e","--dsw-alias-state-error-primary":"#e8524a","--dsw-alias-state-error-secondary":"#ff7a6e","--dsw-alias-state-idle-primary":"#564f4d","--dsw-alias-state-success-primary":"#4f9e6a","--dsw-alias-state-success-secondary":"#79c98f","--dsw-alias-state-success-tertiary":"#151d16","--dsw-alias-state-warn-label":"#e6ac4a","--dsw-alias-state-warn-primary":"#d69b3a","--dsw-alias-state-warn-secondary":"#f0bd63","--dsw-alias-state-warn-tertiary":"#261d10","--dsw-alias-switch-thumb":"#cdb8b0","--dsw-alias-toast-bg":"#332420","--dsw-alias-toast-label":"#f6e8e2","--dsw-alias-tooltip-bg":"#35251f","--dsw-alias-tooltip-key-bg":"#594c47","--dsw-alias-turn-trigger-bg":"rgba(230, 214, 207, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(230, 214, 207, 0.11)","--dsw-specific-bubble-highlight":"#3d2d2a","--dsw-specific-bubble":"#2d2120","--dsw-specific-input-major":"#231f1f","--dsw-specific-login-input":"#141111","--dsw-menu-surface-fill":"rgba(60, 55, 53, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(69, 63, 61, 0.94)","--dsw-specific-menu":"rgba(60, 55, 53, 0.46)","--dsw-specific-selector":"#2e2a29","--dsw-specific-sidebar-fill":"#161313","--dsw-specific-sidebar-nav-item-active-accent":"#3c2522","--dsw-specific-sidebar-nav-item-active":"#2e2a29","--dsw-specific-sidebar-nav-item-hover":"#231f1f","--dsw-specific-tip":"#2e2a29","--dsw-alias-settings-card-fill":"#231f1f","--dsw-alias-settings-card-stroke":"rgba(230, 214, 207, 0.23)","--dsw-alias-onboarding-accent":"#e8a54a","--dsw-alias-onboarding-card-fill":"rgba(73, 67, 65, 0.8)","--dsw-alias-onboarding-secondary-fill":"#403b39","--dsw-alias-onboarding-checkbox-border":"rgba(230, 214, 207, 0.13)"},"check":{"labelPrimaryOnBase":14.57,"labelSecondaryOnBase":8.33,"brandOnBase":3.94,"labelOnBrand":3.7,"stateOnBase":5.39,"failures":[]}},{"id":"h4x0r-bone","name":"Bone","colorScheme":"light","tagline":"Declassified parchment daylight","description":"Declassified blueprint and parchment light theme with ink text and rust accent.","tokens":{"--dsw-alias-bg-base":"#efe9dc","--dsw-alias-bg-document-preview":"#e7e1d4","--dsw-alias-bg-document-selection":"rgba(58, 108, 181, 0.4)","--dsw-alias-label-document-preview":"#5a5349","--dsw-alias-bg-layer-1":"#f4f0e5","--dsw-alias-bg-layer-2":"#f8f4eb","--dsw-alias-bg-layer-3":"#fbf7ef","--dsw-alias-bg-mask-1":"rgba(64, 60, 53, 0.24)","--dsw-alias-bg-mask-2":"rgba(64, 60, 53, 0.12)","--dsw-alias-bg-mask-3":"rgba(64, 60, 53, 0.48)","--dsw-alias-bg-mask-photo":"rgba(64, 60, 53, 0.88)","--dsw-alias-bg-mask-drop":"rgba(254, 251, 245, 0.72)","--dsw-alias-bg-module-platform":"#fbf7ef","--dsw-alias-bg-multi-select":"#ebe5d8","--dsw-alias-bg-overlay":"#fbf9f1","--dsw-alias-bg-skeleton":"rgba(33, 29, 23, 0.05)","--dsw-alias-border-inverted2":"rgba(33, 29, 23, 0)","--dsw-alias-border-inverted":"rgba(33, 29, 23, 0)","--dsw-alias-border-l1":"rgba(33, 29, 23, 0.09)","--dsw-alias-border-l2-darkmode-thin":"rgba(33, 29, 23, 0.11)","--dsw-alias-border-l2":"rgba(33, 29, 23, 0.15)","--dsw-alias-border-l3":"rgba(33, 29, 23, 0.2)","--dsw-alias-border-l4":"rgba(33, 29, 23, 0.26)","--dsw-alias-brand-primary-invert":"#211d17","--dsw-alias-brand-primary-new-colorprimary-new-color":"#325ea8","--dsw-alias-brand-primary":"#a95526","--dsw-alias-brand-text":"#8a3a16","--dsw-alias-button-contrast-fill":"#2b251d","--dsw-alias-button-elevated-fill":"#fbf7ef","--dsw-alias-button-floating-fill":"#f8f4eb","--dsw-alias-button-floating-hover":"#fbf7ef","--dsw-alias-button-ghost-active-border":"#88837a","--dsw-alias-button-ghost-active-fill":"#fbf7ef","--dsw-alias-button-ghost-active-hover":"#d6d1c4","--dsw-alias-button-info-fill":"#3a6cb5","--dsw-alias-button-info-hover":"#3763a2","--dsw-alias-button-primary-dimmed":"#e0c8b4","--dsw-alias-button-primary-fill":"#a95526","--dsw-alias-button-primary-hover":"#b96432","--dsw-alias-button-tool-bar-fill-invisible":"rgba(177, 172, 161, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(177, 172, 161, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(177, 172, 161, 0.6)","--dsw-alias-interactive-bg-active":"rgba(169, 85, 38, 0.14)","--dsw-alias-interactive-bg-hover-accent":"rgba(169, 85, 38, 0.18)","--dsw-alias-interactive-bg-hover-danger":"rgba(171, 59, 47, 0.1)","--dsw-alias-interactive-bg-hover-solid":"#fbf7ef","--dsw-alias-interactive-bg-hover":"rgba(33, 29, 23, 0.05)","--dsw-alias-label-caption":"#8a8175","--dsw-alias-label-deep-diving":"#2f6fa8","--dsw-alias-label-deep-diving-shimmer":"rgba(47, 111, 168, 0.35)","--dsw-alias-label-dimmed":"#b3ab9c","--dsw-alias-label-primary-bluish":"#1c3a63","--dsw-alias-label-primary-dimmed":"#37332d","--dsw-alias-label-primary-foreground":"#fbf5e8","--dsw-alias-label-primary-inverted":"#fffdf7","--dsw-alias-label-primary":"#211d17","--dsw-alias-label-secondary":"#5a5349","--dsw-alias-label-shimmer":"rgba(33, 29, 23, 0.28)","--dsw-alias-label-tertiary":"#746c60","--dsw-alias-menu-icon":"#403b33","--dsw-alias-link":"#2f5c9e","--dsw-alias-markdown-citation":"#e5dfd2","--dsw-alias-markdown-code-block-banner":"#e8e2d5","--dsw-alias-markdown-code-block":"#e4ded1","--dsw-alias-markdown-code-segment-selected":"#fdfaf3","--dsw-alias-markdown-code-segment-unselected":"#e4ded1","--dsw-alias-markdown-inline-code":"#e4ded1","--dsw-alias-markdown-placeholder":"#f8f4eb","--dsw-alias-markdown-tag":"#e3ddd0","--dsw-alias-scrollbar-bg-l1":"#cec8bc","--dsw-alias-scrollbar-bg-l2":"#beb8ad","--dsw-alias-scrollbar-hover-l1":"#c6c0b5","--dsw-alias-scrollbar-hover-l2":"#b5b0a5","--dsw-alias-state-business-primary":"#325ea8","--dsw-alias-state-business-tertiary":"rgba(50, 94, 168, 0.14)","--dsw-alias-code-diff-added":"rgba(63, 86, 32, 0.1)","--dsw-alias-code-diff-deleted":"rgba(122, 36, 27, 0.1)","--dsw-alias-file-diff-added-bg":"#e2e3d1","--dsw-alias-file-diff-added-gutter":"#f2f1e6","--dsw-alias-file-diff-added-marker":"#3f5620","--dsw-alias-file-diff-deleted-bg":"#eddad1","--dsw-alias-file-diff-deleted-gutter":"#f7ede6","--dsw-alias-file-diff-deleted-marker":"#7a241b","--dsw-alias-state-error-primary":"#ab3b2f","--dsw-alias-state-error-secondary":"#c85a48","--dsw-alias-state-idle-primary":"#b9b4a9","--dsw-alias-state-success-primary":"#5c7a34","--dsw-alias-state-success-secondary":"#7a9e4a","--dsw-alias-state-success-tertiary":"#e4e4d3","--dsw-alias-state-warn-label":"#8c5f14","--dsw-alias-state-warn-primary":"#a8741f","--dsw-alias-state-warn-secondary":"#c08a2e","--dsw-alias-state-warn-tertiary":"#eee3d0","--dsw-alias-switch-thumb":"#fcf9f2","--dsw-alias-toast-bg":"#2b251d","--dsw-alias-toast-label":"#f7efe0","--dsw-alias-tooltip-bg":"#2b251d","--dsw-alias-tooltip-key-bg":"#514c46","--dsw-alias-turn-trigger-bg":"#f5f1e7","--dsw-alias-turn-trigger-bg-hover":"#e5dfd2","--dsw-specific-bubble-highlight":"#ebdbcb","--dsw-specific-bubble":"#f8f4eb","--dsw-specific-input-major":"#fffdf7","--dsw-specific-login-input":"#e4ded1","--dsw-menu-surface-fill":"rgba(251, 248, 240, 0.58)","--dsw-alias-menu-group-header-fill":"rgba(252, 249, 242, 0.94)","--dsw-specific-menu":"rgba(251, 248, 240, 0.58)","--dsw-specific-selector":"#fbf7ef","--dsw-specific-sidebar-fill":"#e9e3d6","--dsw-specific-sidebar-nav-item-active-accent":"#e5d4c3","--dsw-specific-sidebar-nav-item-active":"#f3eadf","--dsw-specific-sidebar-nav-item-hover":"#e5dfd2","--dsw-specific-tip":"#fbf7ef","--dsw-alias-settings-card-fill":"#f8f4eb","--dsw-alias-settings-card-stroke":"rgba(33, 29, 23, 0.26)","--dsw-alias-onboarding-accent":"#325ea8","--dsw-alias-onboarding-card-fill":"rgba(254, 252, 246, 0.82)","--dsw-alias-onboarding-secondary-fill":"#fefbf5","--dsw-alias-onboarding-checkbox-border":"rgba(33, 29, 23, 0.22)"},"check":{"labelPrimaryOnBase":13.86,"labelSecondaryOnBase":6.27,"brandOnBase":4.32,"labelOnBrand":3.2,"stateOnBase":3.35,"failures":[]}},{"id":"h4x0r-dim","name":"Dim","colorScheme":"dark","tagline":"Low light for sore eyes","description":"Low-luminance, low-saturation theme for migraine and light sensitivity.","tokens":{"--dsw-alias-bg-base":"#26282d","--dsw-alias-bg-document-preview":"#26282d","--dsw-alias-bg-document-selection":"rgba(127, 155, 176, 0.4)","--dsw-alias-label-document-preview":"#999da1","--dsw-alias-bg-layer-1":"#2d2f34","--dsw-alias-bg-layer-2":"#323439","--dsw-alias-bg-layer-3":"#37393e","--dsw-alias-bg-mask-1":"rgba(11, 11, 13, 0.2)","--dsw-alias-bg-mask-2":"rgba(11, 11, 13, 0.1)","--dsw-alias-bg-mask-3":"rgba(11, 11, 13, 0.4)","--dsw-alias-bg-mask-photo":"rgba(11, 11, 13, 0.8)","--dsw-alias-bg-mask-drop":"rgba(79, 81, 86, 0.7)","--dsw-alias-bg-module-platform":"#37393e","--dsw-alias-bg-multi-select":"#2c2e33","--dsw-alias-bg-overlay":"#43464a","--dsw-alias-bg-skeleton":"rgba(185, 188, 192, 0.06)","--dsw-alias-border-inverted2":"rgba(185, 188, 192, 0.08)","--dsw-alias-border-inverted":"rgba(185, 188, 192, 0.06)","--dsw-alias-border-l1":"rgba(185, 188, 192, 0.1)","--dsw-alias-border-l2-darkmode-thin":"rgba(185, 188, 192, 0.1)","--dsw-alias-border-l2":"rgba(185, 188, 192, 0.14)","--dsw-alias-border-l3":"rgba(185, 188, 192, 0.18)","--dsw-alias-border-l4":"rgba(185, 188, 192, 0.22)","--dsw-alias-brand-primary-invert":"#d4d6d8","--dsw-alias-brand-primary-new-colorprimary-new-color":"#8fa9b8","--dsw-alias-brand-primary":"#527d68","--dsw-alias-brand-text":"#9fbfae","--dsw-alias-button-contrast-fill":"#cfd2d5","--dsw-alias-button-elevated-fill":"#37393e","--dsw-alias-button-floating-fill":"#323439","--dsw-alias-button-floating-hover":"#37393e","--dsw-alias-button-ghost-active-border":"#707277","--dsw-alias-button-ghost-active-fill":"#37393e","--dsw-alias-button-ghost-active-hover":"#494c50","--dsw-alias-button-info-fill":"#526d82","--dsw-alias-button-info-hover":"#677d8e","--dsw-alias-button-primary-dimmed":"#40594f","--dsw-alias-button-primary-fill":"#527d68","--dsw-alias-button-primary-hover":"#628c76","--dsw-alias-button-tool-bar-fill-invisible":"rgba(82, 84, 89, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(82, 84, 89, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(82, 84, 89, 0.6)","--dsw-alias-interactive-bg-active":"rgba(82, 125, 104, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(82, 125, 104, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(164, 102, 94, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#37393e","--dsw-alias-interactive-bg-hover":"rgba(185, 188, 192, 0.07)","--dsw-alias-label-caption":"#71757a","--dsw-alias-label-deep-diving":"#93b3a1","--dsw-alias-label-deep-diving-shimmer":"rgba(147, 179, 161, 0.35)","--dsw-alias-label-dimmed":"#4a4d52","--dsw-alias-label-primary-bluish":"#d4d6d8","--dsw-alias-label-primary-dimmed":"#bfc1c3","--dsw-alias-label-primary-foreground":"#1a2420","--dsw-alias-label-primary-inverted":"#3b3d42","--dsw-alias-label-primary":"#d4d6d8","--dsw-alias-label-secondary":"#999da1","--dsw-alias-label-shimmer":"rgba(212, 214, 216, 0.32)","--dsw-alias-label-tertiary":"#878b90","--dsw-alias-menu-icon":"#b4b7ba","--dsw-alias-link":"#8fb8a4","--dsw-alias-markdown-citation":"#323439","--dsw-alias-markdown-code-block-banner":"#313338","--dsw-alias-markdown-code-block":"#2b2d32","--dsw-alias-markdown-code-segment-selected":"#424449","--dsw-alias-markdown-code-segment-unselected":"#2b2d32","--dsw-alias-markdown-inline-code":"#33353a","--dsw-alias-markdown-placeholder":"#323439","--dsw-alias-markdown-tag":"#35373c","--dsw-alias-scrollbar-bg-l1":"#43464a","--dsw-alias-scrollbar-bg-l2":"#525459","--dsw-alias-scrollbar-hover-l1":"#585a5f","--dsw-alias-scrollbar-hover-l2":"#67696e","--dsw-alias-state-business-primary":"#5f7d93","--dsw-alias-state-business-tertiary":"rgba(95, 125, 147, 0.14)","--dsw-alias-code-diff-added":"rgba(107, 143, 116, 0.1)","--dsw-alias-code-diff-deleted":"rgba(164, 102, 94, 0.1)","--dsw-alias-file-diff-added-bg":"#313838","--dsw-alias-file-diff-added-gutter":"#2c3133","--dsw-alias-file-diff-added-marker":"#86ab8f","--dsw-alias-file-diff-deleted-bg":"#3a3235","--dsw-alias-file-diff-deleted-gutter":"#312e31","--dsw-alias-file-diff-deleted-marker":"#c07f76","--dsw-alias-state-error-primary":"#a4665e","--dsw-alias-state-error-secondary":"#c07f76","--dsw-alias-state-idle-primary":"#585a5f","--dsw-alias-state-success-primary":"#6b8f74","--dsw-alias-state-success-secondary":"#86ab8f","--dsw-alias-state-success-tertiary":"#2f3536","--dsw-alias-state-warn-label":"#b39458","--dsw-alias-state-warn-primary":"#9c7d45","--dsw-alias-state-warn-secondary":"#b09258","--dsw-alias-state-warn-tertiary":"#353330","--dsw-alias-switch-thumb":"#b6b9bd","--dsw-alias-toast-bg":"#33363b","--dsw-alias-toast-label":"#dfe2e5","--dsw-alias-tooltip-bg":"#363a3f","--dsw-alias-tooltip-key-bg":"#5a5d62","--dsw-alias-turn-trigger-bg":"rgba(185, 188, 192, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(185, 188, 192, 0.11)","--dsw-specific-bubble-highlight":"#3a4042","--dsw-specific-bubble":"#34383c","--dsw-specific-input-major":"#323439","--dsw-specific-login-input":"#2b2d32","--dsw-menu-surface-fill":"rgba(70, 73, 77, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(76, 78, 83, 0.94)","--dsw-specific-menu":"rgba(70, 73, 77, 0.46)","--dsw-specific-selector":"#37393e","--dsw-specific-sidebar-fill":"#2d2f34","--dsw-specific-sidebar-nav-item-active-accent":"#374041","--dsw-specific-sidebar-nav-item-active":"#37393e","--dsw-specific-sidebar-nav-item-hover":"#323439","--dsw-specific-tip":"#37393e","--dsw-alias-settings-card-fill":"#323439","--dsw-alias-settings-card-stroke":"rgba(185, 188, 192, 0.22)","--dsw-alias-onboarding-accent":"#7f9bb0","--dsw-alias-onboarding-card-fill":"rgba(79, 81, 86, 0.8)","--dsw-alias-onboarding-secondary-fill":"#494c50","--dsw-alias-onboarding-checkbox-border":"rgba(185, 188, 192, 0.14)"},"check":{"labelPrimaryOnBase":10.12,"labelSecondaryOnBase":5.4,"brandOnBase":3.15,"labelOnBrand":3.21,"stateOnBase":3.26,"failures":[]}}]},{"id":"mirage","name":"MIRAGE","tagline":"Anime-minimal moods in ten palettes","themes":[{"id":"mirage-sakura","name":"Sakura","colorScheme":"light","tagline":"Blush and cream, plum ink","description":"Warm blush off-white, deep plum ink and a muted rose accent.","tokens":{"--dsw-alias-bg-base":"#f7efec","--dsw-alias-bg-document-preview":"#efe7e4","--dsw-alias-bg-document-selection":"rgba(138, 95, 138, 0.4)","--dsw-alias-label-document-preview":"#6b5762","--dsw-alias-bg-layer-1":"#f9f2f0","--dsw-alias-bg-layer-2":"#fbf5f2","--dsw-alias-bg-layer-3":"#fdf7f5","--dsw-alias-bg-mask-1":"rgba(86, 67, 76, 0.24)","--dsw-alias-bg-mask-2":"rgba(86, 67, 76, 0.12)","--dsw-alias-bg-mask-3":"rgba(86, 67, 76, 0.48)","--dsw-alias-bg-mask-photo":"rgba(86, 67, 76, 0.88)","--dsw-alias-bg-mask-drop":"rgba(254, 249, 247, 0.72)","--dsw-alias-bg-module-platform":"#fdf7f5","--dsw-alias-bg-multi-select":"#f3ebe8","--dsw-alias-bg-overlay":"#fdf8f5","--dsw-alias-bg-skeleton":"rgba(58, 37, 48, 0.05)","--dsw-alias-border-inverted2":"rgba(58, 37, 48, 0)","--dsw-alias-border-inverted":"rgba(58, 37, 48, 0)","--dsw-alias-border-l1":"rgba(58, 37, 48, 0.09)","--dsw-alias-border-l2-darkmode-thin":"rgba(58, 37, 48, 0.11)","--dsw-alias-border-l2":"rgba(58, 37, 48, 0.15)","--dsw-alias-border-l3":"rgba(58, 37, 48, 0.2)","--dsw-alias-border-l4":"rgba(58, 37, 48, 0.26)","--dsw-alias-brand-primary-invert":"#3a2530","--dsw-alias-brand-primary-new-colorprimary-new-color":"#7a5f86","--dsw-alias-brand-primary":"#b85c78","--dsw-alias-brand-text":"#8f3f57","--dsw-alias-button-contrast-fill":"#3a2530","--dsw-alias-button-elevated-fill":"#fdf7f5","--dsw-alias-button-floating-fill":"#fbf5f2","--dsw-alias-button-floating-hover":"#fdf7f5","--dsw-alias-button-ghost-active-border":"#998a8e","--dsw-alias-button-ghost-active-fill":"#fdf7f5","--dsw-alias-button-ghost-active-hover":"#e0d7d5","--dsw-alias-button-info-fill":"#6b5570","--dsw-alias-button-info-hover":"#654f68","--dsw-alias-button-primary-dimmed":"#e9cfd2","--dsw-alias-button-primary-fill":"#b85c78","--dsw-alias-button-primary-hover":"#c56f89","--dsw-alias-button-tool-bar-fill-invisible":"rgba(190, 178, 180, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(190, 178, 180, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(190, 178, 180, 0.6)","--dsw-alias-interactive-bg-active":"rgba(184, 92, 120, 0.14)","--dsw-alias-interactive-bg-hover-accent":"rgba(184, 92, 120, 0.18)","--dsw-alias-interactive-bg-hover-danger":"rgba(184, 58, 78, 0.1)","--dsw-alias-interactive-bg-hover-solid":"#fdf7f5","--dsw-alias-interactive-bg-hover":"rgba(58, 37, 48, 0.05)","--dsw-alias-label-caption":"#a08d96","--dsw-alias-label-deep-diving":"#8a5f8a","--dsw-alias-label-deep-diving-shimmer":"rgba(138, 95, 138, 0.35)","--dsw-alias-label-dimmed":"#d4c4c9","--dsw-alias-label-primary-bluish":"#3c2a56","--dsw-alias-label-primary-dimmed":"#4e3a44","--dsw-alias-label-primary-foreground":"#fdf7f4","--dsw-alias-label-primary-inverted":"#fffaf8","--dsw-alias-label-primary":"#3a2530","--dsw-alias-label-secondary":"#6b5762","--dsw-alias-label-shimmer":"rgba(58, 37, 48, 0.28)","--dsw-alias-label-tertiary":"#8a7681","--dsw-alias-menu-icon":"#55414c","--dsw-alias-link":"#9c4a66","--dsw-alias-markdown-citation":"#eee5e3","--dsw-alias-markdown-code-block-banner":"#f0e8e5","--dsw-alias-markdown-code-block":"#ede4e2","--dsw-alias-markdown-code-segment-selected":"#fef8f6","--dsw-alias-markdown-code-segment-unselected":"#ede4e2","--dsw-alias-markdown-inline-code":"#ede4e2","--dsw-alias-markdown-placeholder":"#fbf5f2","--dsw-alias-markdown-tag":"#ece3e1","--dsw-alias-scrollbar-bg-l1":"#d9cfce","--dsw-alias-scrollbar-bg-l2":"#cabfbf","--dsw-alias-scrollbar-hover-l1":"#d1c7c6","--dsw-alias-scrollbar-hover-l2":"#c2b6b7","--dsw-alias-state-business-primary":"#6b5570","--dsw-alias-state-business-tertiary":"rgba(107, 85, 112, 0.14)","--dsw-alias-code-diff-added":"rgba(66, 90, 38, 0.1)","--dsw-alias-code-diff-deleted":"rgba(127, 38, 52, 0.1)","--dsw-alias-file-diff-added-bg":"#e5e4d9","--dsw-alias-file-diff-added-gutter":"#f3f0ea","--dsw-alias-file-diff-added-marker":"#425a26","--dsw-alias-file-diff-deleted-bg":"#f2dbdc","--dsw-alias-file-diff-deleted-gutter":"#f9eceb","--dsw-alias-file-diff-deleted-marker":"#7f2634","--dsw-alias-state-error-primary":"#b83a4e","--dsw-alias-state-error-secondary":"#cf5a68","--dsw-alias-state-idle-primary":"#c6babb","--dsw-alias-state-success-primary":"#5d7a3a","--dsw-alias-state-success-secondary":"#78963f","--dsw-alias-state-success-tertiary":"#e6e5db","--dsw-alias-state-warn-label":"#8a5c14","--dsw-alias-state-warn-primary":"#a06a20","--dsw-alias-state-warn-secondary":"#bd8536","--dsw-alias-state-warn-tertiary":"#efe3d8","--dsw-alias-switch-thumb":"#fdf9f7","--dsw-alias-toast-bg":"#3a2530","--dsw-alias-toast-label":"#fbf2f4","--dsw-alias-tooltip-bg":"#3a2530","--dsw-alias-tooltip-key-bg":"#5d4c55","--dsw-alias-turn-trigger-bg":"#faf3f1","--dsw-alias-turn-trigger-bg-hover":"#eee5e3","--dsw-specific-bubble-highlight":"#f0dddf","--dsw-specific-bubble":"#fbf5f3","--dsw-specific-input-major":"#fffaf8","--dsw-specific-login-input":"#ede4e2","--dsw-menu-surface-fill":"rgba(253, 247, 245, 0.58)","--dsw-alias-menu-group-header-fill":"rgba(253, 248, 246, 0.94)","--dsw-specific-menu":"rgba(253, 247, 245, 0.58)","--dsw-specific-selector":"#fdf7f5","--dsw-specific-sidebar-fill":"#f1e9e6","--dsw-specific-sidebar-nav-item-active-accent":"#eedadc","--dsw-specific-sidebar-nav-item-active":"#f7ecec","--dsw-specific-sidebar-nav-item-hover":"#eee5e3","--dsw-specific-tip":"#fdf7f5","--dsw-alias-settings-card-fill":"#fbf5f2","--dsw-alias-settings-card-stroke":"rgba(58, 37, 48, 0.26)","--dsw-alias-onboarding-accent":"#7a5f86","--dsw-alias-onboarding-card-fill":"rgba(255, 249, 247, 0.82)","--dsw-alias-onboarding-secondary-fill":"#fef9f7","--dsw-alias-onboarding-checkbox-border":"rgba(58, 37, 48, 0.22)"},"check":{"labelPrimaryOnBase":12.45,"labelSecondaryOnBase":5.85,"brandOnBase":3.82,"labelOnBrand":3.25,"stateOnBase":4.04,"failures":[]}},{"id":"mirage-mecha","name":"Mecha","colorScheme":"dark","tagline":"Gunmetal frame, hazard orange","description":"Cool graphite near-black with a hazard orange accent and red alert states.","tokens":{"--dsw-alias-bg-base":"#111417","--dsw-alias-bg-document-preview":"#111417","--dsw-alias-bg-document-selection":"rgba(255, 157, 61, 0.4)","--dsw-alias-label-document-preview":"#a4afb9","--dsw-alias-bg-layer-1":"#1c1f22","--dsw-alias-bg-layer-2":"#26292d","--dsw-alias-bg-layer-3":"#2f3337","--dsw-alias-bg-mask-1":"rgba(5, 6, 6, 0.24)","--dsw-alias-bg-mask-2":"rgba(5, 6, 6, 0.12)","--dsw-alias-bg-mask-3":"rgba(5, 6, 6, 0.48)","--dsw-alias-bg-mask-photo":"rgba(5, 6, 6, 0.88)","--dsw-alias-bg-mask-drop":"rgba(72, 76, 81, 0.7)","--dsw-alias-bg-module-platform":"#2f3337","--dsw-alias-bg-multi-select":"#191c1f","--dsw-alias-bg-overlay":"#484c51","--dsw-alias-bg-skeleton":"rgba(213, 221, 230, 0.06)","--dsw-alias-border-inverted2":"rgba(213, 221, 230, 0.08)","--dsw-alias-border-inverted":"rgba(213, 221, 230, 0.06)","--dsw-alias-border-l1":"rgba(213, 221, 230, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(213, 221, 230, 0.08)","--dsw-alias-border-l2":"rgba(213, 221, 230, 0.13)","--dsw-alias-border-l3":"rgba(213, 221, 230, 0.18)","--dsw-alias-border-l4":"rgba(213, 221, 230, 0.23)","--dsw-alias-brand-primary-invert":"#dfe6ec","--dsw-alias-brand-primary-new-colorprimary-new-color":"#6f98c9","--dsw-alias-brand-primary":"#b37012","--dsw-alias-brand-text":"#ffb45e","--dsw-alias-button-contrast-fill":"#e8edf2","--dsw-alias-button-elevated-fill":"#2f3337","--dsw-alias-button-floating-fill":"#26292d","--dsw-alias-button-floating-hover":"#2f3337","--dsw-alias-button-ghost-active-border":"#73797f","--dsw-alias-button-ghost-active-fill":"#2f3337","--dsw-alias-button-ghost-active-hover":"#404449","--dsw-alias-button-info-fill":"#4a6f9e","--dsw-alias-button-info-hover":"#6685ac","--dsw-alias-button-primary-dimmed":"#6f4914","--dsw-alias-button-primary-fill":"#b37012","--dsw-alias-button-primary-hover":"#c98420","--dsw-alias-button-tool-bar-fill-invisible":"rgba(76, 80, 85, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(76, 80, 85, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(76, 80, 85, 0.6)","--dsw-alias-interactive-bg-active":"rgba(179, 112, 18, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(179, 112, 18, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(224, 86, 79, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#2f3337","--dsw-alias-interactive-bg-hover":"rgba(213, 221, 230, 0.07)","--dsw-alias-label-caption":"#68727b","--dsw-alias-label-deep-diving":"#7fb2e0","--dsw-alias-label-deep-diving-shimmer":"rgba(127, 178, 224, 0.35)","--dsw-alias-label-dimmed":"#454d54","--dsw-alias-label-primary-bluish":"#dfe6ec","--dsw-alias-label-primary-dimmed":"#c6cdd2","--dsw-alias-label-primary-foreground":"#1a0d02","--dsw-alias-label-primary-inverted":"#2c3034","--dsw-alias-label-primary":"#dfe6ec","--dsw-alias-label-secondary":"#a4afb9","--dsw-alias-label-shimmer":"rgba(223, 230, 236, 0.32)","--dsw-alias-label-tertiary":"#7f8a94","--dsw-alias-menu-icon":"#bfc8d0","--dsw-alias-link":"#ff9d3d","--dsw-alias-markdown-citation":"#26292d","--dsw-alias-markdown-code-block-banner":"#202327","--dsw-alias-markdown-code-block":"#181b1e","--dsw-alias-markdown-code-segment-selected":"#363a3e","--dsw-alias-markdown-code-segment-unselected":"#181b1e","--dsw-alias-markdown-inline-code":"#23262a","--dsw-alias-markdown-placeholder":"#26292d","--dsw-alias-markdown-tag":"#25282c","--dsw-alias-scrollbar-bg-l1":"#383c40","--dsw-alias-scrollbar-bg-l2":"#4c5055","--dsw-alias-scrollbar-hover-l1":"#54585d","--dsw-alias-scrollbar-hover-l2":"#676c72","--dsw-alias-state-business-primary":"#4a6f9e","--dsw-alias-state-business-tertiary":"rgba(74, 111, 158, 0.14)","--dsw-alias-code-diff-added":"rgba(63, 158, 110, 0.1)","--dsw-alias-code-diff-deleted":"rgba(224, 86, 79, 0.1)","--dsw-alias-file-diff-added-bg":"#182a25","--dsw-alias-file-diff-added-gutter":"#15201f","--dsw-alias-file-diff-added-marker":"#63c98f","--dsw-alias-file-diff-deleted-bg":"#321f20","--dsw-alias-file-diff-deleted-gutter":"#231a1c","--dsw-alias-file-diff-deleted-marker":"#ff7a72","--dsw-alias-state-error-primary":"#e0564f","--dsw-alias-state-error-secondary":"#ff7a72","--dsw-alias-state-idle-primary":"#54585d","--dsw-alias-state-success-primary":"#3f9e6e","--dsw-alias-state-success-secondary":"#63c98f","--dsw-alias-state-success-tertiary":"#172622","--dsw-alias-state-warn-label":"#e2aa50","--dsw-alias-state-warn-primary":"#d19a3a","--dsw-alias-state-warn-secondary":"#f0bc63","--dsw-alias-state-warn-tertiary":"#2a251c","--dsw-alias-switch-thumb":"#b8c2cb","--dsw-alias-toast-bg":"#1d242b","--dsw-alias-toast-label":"#e8eef3","--dsw-alias-tooltip-bg":"#202830","--dsw-alias-tooltip-key-bg":"#484f55","--dsw-alias-turn-trigger-bg":"rgba(213, 221, 230, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(213, 221, 230, 0.11)","--dsw-specific-bubble-highlight":"#3c3933","--dsw-specific-bubble":"#2e2d2b","--dsw-specific-input-major":"#26292d","--dsw-specific-login-input":"#181b1e","--dsw-menu-surface-fill":"rgba(60, 64, 69, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(68, 72, 77, 0.94)","--dsw-specific-menu":"rgba(60, 64, 69, 0.46)","--dsw-specific-selector":"#2f3337","--dsw-specific-sidebar-fill":"#1a1d20","--dsw-specific-sidebar-nav-item-active-accent":"#3d3429","--dsw-specific-sidebar-nav-item-active":"#2f3337","--dsw-specific-sidebar-nav-item-hover":"#26292d","--dsw-specific-tip":"#2f3337","--dsw-alias-settings-card-fill":"#26292d","--dsw-alias-settings-card-stroke":"rgba(213, 221, 230, 0.23)","--dsw-alias-onboarding-accent":"#6f98c9","--dsw-alias-onboarding-card-fill":"rgba(72, 76, 81, 0.8)","--dsw-alias-onboarding-secondary-fill":"#404449","--dsw-alias-onboarding-checkbox-border":"rgba(213, 221, 230, 0.13)"},"check":{"labelPrimaryOnBase":14.67,"labelSecondaryOnBase":8.28,"brandOnBase":4.61,"labelOnBrand":3.18,"stateOnBase":4.94,"failures":[]}},{"id":"mirage-ghost","name":"Ghost","colorScheme":"dark","tagline":"Low-chroma blue-gray, pale signal","description":"Low-chroma blue-black surfaces with a pale cyan signal accent.","tokens":{"--dsw-alias-bg-base":"#0d1116","--dsw-alias-bg-document-preview":"#0d1116","--dsw-alias-bg-document-selection":"rgba(122, 167, 196, 0.4)","--dsw-alias-label-document-preview":"#8f99a3","--dsw-alias-bg-layer-1":"#171c21","--dsw-alias-bg-layer-2":"#21252b","--dsw-alias-bg-layer-3":"#2a2f35","--dsw-alias-bg-mask-1":"rgba(4, 5, 6, 0.24)","--dsw-alias-bg-mask-2":"rgba(4, 5, 6, 0.12)","--dsw-alias-bg-mask-3":"rgba(4, 5, 6, 0.48)","--dsw-alias-bg-mask-photo":"rgba(4, 5, 6, 0.88)","--dsw-alias-bg-mask-drop":"rgba(66, 72, 78, 0.7)","--dsw-alias-bg-module-platform":"#2a2f35","--dsw-alias-bg-multi-select":"#15191e","--dsw-alias-bg-overlay":"#42484e","--dsw-alias-bg-skeleton":"rgba(201, 212, 221, 0.06)","--dsw-alias-border-inverted2":"rgba(201, 212, 221, 0.08)","--dsw-alias-border-inverted":"rgba(201, 212, 221, 0.06)","--dsw-alias-border-l1":"rgba(201, 212, 221, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(201, 212, 221, 0.08)","--dsw-alias-border-l2":"rgba(201, 212, 221, 0.13)","--dsw-alias-border-l3":"rgba(201, 212, 221, 0.18)","--dsw-alias-border-l4":"rgba(201, 212, 221, 0.23)","--dsw-alias-brand-primary-invert":"#c9d1d8","--dsw-alias-brand-primary-new-colorprimary-new-color":"#7aa7c4","--dsw-alias-brand-primary":"#3d7684","--dsw-alias-brand-text":"#a8cfd8","--dsw-alias-button-contrast-fill":"#d2dae1","--dsw-alias-button-elevated-fill":"#2a2f35","--dsw-alias-button-floating-fill":"#21252b","--dsw-alias-button-floating-hover":"#2a2f35","--dsw-alias-button-ghost-active-border":"#6b737a","--dsw-alias-button-ghost-active-fill":"#2a2f35","--dsw-alias-button-ghost-active-hover":"#3a4046","--dsw-alias-button-info-fill":"#4a6d8f","--dsw-alias-button-info-hover":"#63829f","--dsw-alias-button-primary-dimmed":"#294c56","--dsw-alias-button-primary-fill":"#3d7684","--dsw-alias-button-primary-hover":"#4a8695","--dsw-alias-button-tool-bar-fill-invisible":"rgba(69, 76, 82, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(69, 76, 82, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(69, 76, 82, 0.6)","--dsw-alias-interactive-bg-active":"rgba(61, 118, 132, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(61, 118, 132, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(184, 98, 92, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#2a2f35","--dsw-alias-interactive-bg-hover":"rgba(201, 212, 221, 0.07)","--dsw-alias-label-caption":"#5b646c","--dsw-alias-label-deep-diving":"#8fbcc8","--dsw-alias-label-deep-diving-shimmer":"rgba(143, 188, 200, 0.35)","--dsw-alias-label-dimmed":"#3c4349","--dsw-alias-label-primary-bluish":"#c9d1d8","--dsw-alias-label-primary-dimmed":"#b2bac1","--dsw-alias-label-primary-foreground":"#0a1116","--dsw-alias-label-primary-inverted":"#272c32","--dsw-alias-label-primary":"#c9d1d8","--dsw-alias-label-secondary":"#8f99a3","--dsw-alias-label-shimmer":"rgba(201, 209, 216, 0.32)","--dsw-alias-label-tertiary":"#6f7982","--dsw-alias-menu-icon":"#a9b2bb","--dsw-alias-link":"#9dc4cf","--dsw-alias-markdown-citation":"#21252b","--dsw-alias-markdown-code-block-banner":"#1b2025","--dsw-alias-markdown-code-block":"#14181d","--dsw-alias-markdown-code-segment-selected":"#31363c","--dsw-alias-markdown-code-segment-unselected":"#14181d","--dsw-alias-markdown-inline-code":"#1e2328","--dsw-alias-markdown-placeholder":"#21252b","--dsw-alias-markdown-tag":"#20252a","--dsw-alias-scrollbar-bg-l1":"#33383e","--dsw-alias-scrollbar-bg-l2":"#454c52","--dsw-alias-scrollbar-hover-l1":"#4d535a","--dsw-alias-scrollbar-hover-l2":"#60676e","--dsw-alias-state-business-primary":"#5a86a6","--dsw-alias-state-business-tertiary":"rgba(90, 134, 166, 0.14)","--dsw-alias-code-diff-added":"rgba(79, 143, 114, 0.1)","--dsw-alias-code-diff-deleted":"rgba(184, 98, 92, 0.1)","--dsw-alias-file-diff-added-bg":"#182525","--dsw-alias-file-diff-added-gutter":"#131c1e","--dsw-alias-file-diff-added-marker":"#74b596","--dsw-alias-file-diff-deleted-bg":"#281e21","--dsw-alias-file-diff-deleted-gutter":"#1c181c","--dsw-alias-file-diff-deleted-marker":"#cf817b","--dsw-alias-state-error-primary":"#b8625c","--dsw-alias-state-error-secondary":"#cf817b","--dsw-alias-state-idle-primary":"#4d535a","--dsw-alias-state-success-primary":"#4f8f72","--dsw-alias-state-success-secondary":"#74b596","--dsw-alias-state-success-tertiary":"#162122","--dsw-alias-state-warn-label":"#c09a58","--dsw-alias-state-warn-primary":"#b08a4a","--dsw-alias-state-warn-secondary":"#cfae6f","--dsw-alias-state-warn-tertiary":"#22211d","--dsw-alias-switch-thumb":"#aab4bd","--dsw-alias-toast-bg":"#1a2026","--dsw-alias-toast-label":"#d8e0e6","--dsw-alias-tooltip-bg":"#1d252c","--dsw-alias-tooltip-key-bg":"#464c52","--dsw-alias-turn-trigger-bg":"rgba(201, 212, 221, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(201, 212, 221, 0.11)","--dsw-specific-bubble-highlight":"#2c363d","--dsw-specific-bubble":"#232a30","--dsw-specific-input-major":"#21252b","--dsw-specific-login-input":"#14181d","--dsw-menu-surface-fill":"rgba(54, 60, 66, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(62, 68, 74, 0.94)","--dsw-specific-menu":"rgba(54, 60, 66, 0.46)","--dsw-specific-selector":"#2a2f35","--dsw-specific-sidebar-fill":"#151a1f","--dsw-specific-sidebar-nav-item-active-accent":"#253239","--dsw-specific-sidebar-nav-item-active":"#2a2f35","--dsw-specific-sidebar-nav-item-hover":"#21252b","--dsw-specific-tip":"#2a2f35","--dsw-alias-settings-card-fill":"#21252b","--dsw-alias-settings-card-stroke":"rgba(201, 212, 221, 0.23)","--dsw-alias-onboarding-accent":"#7aa7c4","--dsw-alias-onboarding-card-fill":"rgba(66, 72, 78, 0.8)","--dsw-alias-onboarding-secondary-fill":"#3a4046","--dsw-alias-onboarding-checkbox-border":"rgba(201, 212, 221, 0.13)"},"check":{"labelPrimaryOnBase":12.26,"labelSecondaryOnBase":6.54,"brandOnBase":3.72,"labelOnBrand":3.3,"stateOnBase":4.45,"failures":[]}},{"id":"mirage-abyss","name":"Abyss","colorScheme":"dark","tagline":"Deep water, bioluminescent teal","description":"Near-black indigo water with a bioluminescent teal accent.","tokens":{"--dsw-alias-bg-base":"#0a0c16","--dsw-alias-bg-document-preview":"#0a0c16","--dsw-alias-bg-document-selection":"rgba(127, 143, 224, 0.4)","--dsw-alias-label-document-preview":"#8b98a8","--dsw-alias-bg-layer-1":"#141721","--dsw-alias-bg-layer-2":"#1e212b","--dsw-alias-bg-layer-3":"#272b35","--dsw-alias-bg-mask-1":"rgba(3, 3, 6, 0.24)","--dsw-alias-bg-mask-2":"rgba(3, 3, 6, 0.12)","--dsw-alias-bg-mask-3":"rgba(3, 3, 6, 0.48)","--dsw-alias-bg-mask-photo":"rgba(3, 3, 6, 0.88)","--dsw-alias-bg-mask-drop":"rgba(63, 69, 78, 0.7)","--dsw-alias-bg-module-platform":"#272b35","--dsw-alias-bg-multi-select":"#12141e","--dsw-alias-bg-overlay":"#3f454e","--dsw-alias-bg-skeleton":"rgba(198, 214, 223, 0.06)","--dsw-alias-border-inverted2":"rgba(198, 214, 223, 0.08)","--dsw-alias-border-inverted":"rgba(198, 214, 223, 0.06)","--dsw-alias-border-l1":"rgba(198, 214, 223, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(198, 214, 223, 0.08)","--dsw-alias-border-l2":"rgba(198, 214, 223, 0.13)","--dsw-alias-border-l3":"rgba(198, 214, 223, 0.18)","--dsw-alias-border-l4":"rgba(198, 214, 223, 0.23)","--dsw-alias-brand-primary-invert":"#c6d3dd","--dsw-alias-brand-primary-new-colorprimary-new-color":"#7f8fe0","--dsw-alias-brand-primary":"#2a7d6c","--dsw-alias-brand-text":"#8ad8c2","--dsw-alias-button-contrast-fill":"#d0d8e4","--dsw-alias-button-elevated-fill":"#272b35","--dsw-alias-button-floating-fill":"#1e212b","--dsw-alias-button-floating-hover":"#272b35","--dsw-alias-button-ghost-active-border":"#68717b","--dsw-alias-button-ghost-active-fill":"#272b35","--dsw-alias-button-ghost-active-hover":"#373c46","--dsw-alias-button-info-fill":"#5c6fc4","--dsw-alias-button-info-hover":"#7184c9","--dsw-alias-button-primary-dimmed":"#1d4e48","--dsw-alias-button-primary-fill":"#2a7d6c","--dsw-alias-button-primary-hover":"#348f7c","--dsw-alias-button-tool-bar-fill-invisible":"rgba(66, 73, 82, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(66, 73, 82, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(66, 73, 82, 0.6)","--dsw-alias-interactive-bg-active":"rgba(42, 125, 108, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(42, 125, 108, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(207, 90, 107, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#272b35","--dsw-alias-interactive-bg-hover":"rgba(198, 214, 223, 0.07)","--dsw-alias-label-caption":"#586474","--dsw-alias-label-deep-diving":"#7fb8e0","--dsw-alias-label-deep-diving-shimmer":"rgba(127, 184, 224, 0.35)","--dsw-alias-label-dimmed":"#3a4353","--dsw-alias-label-primary-bluish":"#c6d3dd","--dsw-alias-label-primary-dimmed":"#afbbc5","--dsw-alias-label-primary-foreground":"#04120f","--dsw-alias-label-primary-inverted":"#242832","--dsw-alias-label-primary":"#c6d3dd","--dsw-alias-label-secondary":"#8b98a8","--dsw-alias-label-shimmer":"rgba(198, 211, 221, 0.32)","--dsw-alias-label-tertiary":"#6b7888","--dsw-alias-menu-icon":"#a6b3c0","--dsw-alias-link":"#6fc9b4","--dsw-alias-markdown-citation":"#1e212b","--dsw-alias-markdown-code-block-banner":"#181b25","--dsw-alias-markdown-code-block":"#11131d","--dsw-alias-markdown-code-segment-selected":"#2e323c","--dsw-alias-markdown-code-segment-unselected":"#11131d","--dsw-alias-markdown-inline-code":"#1b1e28","--dsw-alias-markdown-placeholder":"#1e212b","--dsw-alias-markdown-tag":"#1d202a","--dsw-alias-scrollbar-bg-l1":"#30343e","--dsw-alias-scrollbar-bg-l2":"#424952","--dsw-alias-scrollbar-hover-l1":"#4a515a","--dsw-alias-scrollbar-hover-l2":"#5d656e","--dsw-alias-state-business-primary":"#5c6fc4","--dsw-alias-state-business-tertiary":"rgba(92, 111, 196, 0.14)","--dsw-alias-code-diff-added":"rgba(52, 160, 127, 0.1)","--dsw-alias-code-diff-deleted":"rgba(207, 90, 107, 0.1)","--dsw-alias-file-diff-added-bg":"#112427","--dsw-alias-file-diff-added-gutter":"#0e191f","--dsw-alias-file-diff-added-marker":"#5cc9a6","--dsw-alias-file-diff-deleted-bg":"#2a1824","--dsw-alias-file-diff-deleted-gutter":"#1c131e","--dsw-alias-file-diff-deleted-marker":"#e87c8c","--dsw-alias-state-error-primary":"#cf5a6b","--dsw-alias-state-error-secondary":"#e87c8c","--dsw-alias-state-idle-primary":"#4a515a","--dsw-alias-state-success-primary":"#34a07f","--dsw-alias-state-success-secondary":"#5cc9a6","--dsw-alias-state-success-tertiary":"#0f1f24","--dsw-alias-state-warn-label":"#d3ab5c","--dsw-alias-state-warn-primary":"#c39a4a","--dsw-alias-state-warn-secondary":"#dcb96a","--dsw-alias-state-warn-tertiary":"#221e1d","--dsw-alias-switch-thumb":"#aab4c9","--dsw-alias-toast-bg":"#151a2a","--dsw-alias-toast-label":"#d5dcea","--dsw-alias-tooltip-bg":"#181e30","--dsw-alias-tooltip-key-bg":"#424755","--dsw-alias-turn-trigger-bg":"rgba(198, 214, 223, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(198, 214, 223, 0.11)","--dsw-specific-bubble-highlight":"#27333b","--dsw-specific-bubble":"#1f272f","--dsw-specific-input-major":"#1e212b","--dsw-specific-login-input":"#11131d","--dsw-menu-surface-fill":"rgba(51, 56, 66, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(59, 65, 74, 0.94)","--dsw-specific-menu":"rgba(51, 56, 66, 0.46)","--dsw-specific-selector":"#272b35","--dsw-specific-sidebar-fill":"#12151f","--dsw-specific-sidebar-nav-item-active-accent":"#203035","--dsw-specific-sidebar-nav-item-active":"#272b35","--dsw-specific-sidebar-nav-item-hover":"#1e212b","--dsw-specific-tip":"#272b35","--dsw-alias-settings-card-fill":"#1e212b","--dsw-alias-settings-card-stroke":"rgba(198, 214, 223, 0.23)","--dsw-alias-onboarding-accent":"#7f8fe0","--dsw-alias-onboarding-card-fill":"rgba(63, 69, 78, 0.8)","--dsw-alias-onboarding-secondary-fill":"#373c46","--dsw-alias-onboarding-checkbox-border":"rgba(198, 214, 223, 0.13)"},"check":{"labelPrimaryOnBase":12.78,"labelSecondaryOnBase":6.64,"brandOnBase":3.94,"labelOnBrand":3.24,"stateOnBase":4.95,"failures":[]}},{"id":"mirage-neon-rain","name":"Neon Rain","colorScheme":"dark","tagline":"Midnight street, coral signage","description":"Blue-teal midnight black with warm coral signage light.","tokens":{"--dsw-alias-bg-base":"#0a1216","--dsw-alias-bg-document-preview":"#0a1216","--dsw-alias-bg-document-selection":"rgba(255, 154, 114, 0.4)","--dsw-alias-label-document-preview":"#8aa0aa","--dsw-alias-bg-layer-1":"#151d21","--dsw-alias-bg-layer-2":"#1f272b","--dsw-alias-bg-layer-3":"#293136","--dsw-alias-bg-mask-1":"rgba(3, 5, 6, 0.24)","--dsw-alias-bg-mask-2":"rgba(3, 5, 6, 0.12)","--dsw-alias-bg-mask-3":"rgba(3, 5, 6, 0.48)","--dsw-alias-bg-mask-photo":"rgba(3, 5, 6, 0.88)","--dsw-alias-bg-mask-drop":"rgba(65, 75, 79, 0.7)","--dsw-alias-bg-module-platform":"#293136","--dsw-alias-bg-multi-select":"#121a1e","--dsw-alias-bg-overlay":"#414b4f","--dsw-alias-bg-skeleton":"rgba(207, 220, 226, 0.06)","--dsw-alias-border-inverted2":"rgba(207, 220, 226, 0.08)","--dsw-alias-border-inverted":"rgba(207, 220, 226, 0.06)","--dsw-alias-border-l1":"rgba(207, 220, 226, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(207, 220, 226, 0.08)","--dsw-alias-border-l2":"rgba(207, 220, 226, 0.13)","--dsw-alias-border-l3":"rgba(207, 220, 226, 0.18)","--dsw-alias-border-l4":"rgba(207, 220, 226, 0.23)","--dsw-alias-brand-primary-invert":"#c5d4dc","--dsw-alias-brand-primary-new-colorprimary-new-color":"#6fa9c4","--dsw-alias-brand-primary":"#a35f44","--dsw-alias-brand-text":"#ffb59a","--dsw-alias-button-contrast-fill":"#d6e2e8","--dsw-alias-button-elevated-fill":"#293136","--dsw-alias-button-floating-fill":"#1f272b","--dsw-alias-button-floating-hover":"#293136","--dsw-alias-button-ghost-active-border":"#6d777c","--dsw-alias-button-ghost-active-fill":"#293136","--dsw-alias-button-ghost-active-hover":"#394247","--dsw-alias-button-info-fill":"#3f7f96","--dsw-alias-button-info-hover":"#5c92a5","--dsw-alias-button-primary-dimmed":"#633f31","--dsw-alias-button-primary-fill":"#a35f44","--dsw-alias-button-primary-hover":"#b56f52","--dsw-alias-button-tool-bar-fill-invisible":"rgba(69, 79, 83, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(69, 79, 83, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(69, 79, 83, 0.6)","--dsw-alias-interactive-bg-active":"rgba(163, 95, 68, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(163, 95, 68, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(208, 89, 90, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#293136","--dsw-alias-interactive-bg-hover":"rgba(207, 220, 226, 0.07)","--dsw-alias-label-caption":"#596d76","--dsw-alias-label-deep-diving":"#7fc4d8","--dsw-alias-label-deep-diving-shimmer":"rgba(127, 196, 216, 0.35)","--dsw-alias-label-dimmed":"#3a4a52","--dsw-alias-label-primary-bluish":"#c5d4dc","--dsw-alias-label-primary-dimmed":"#afbdc4","--dsw-alias-label-primary-foreground":"#fbede7","--dsw-alias-label-primary-inverted":"#262e33","--dsw-alias-label-primary":"#c5d4dc","--dsw-alias-label-secondary":"#8aa0aa","--dsw-alias-label-shimmer":"rgba(197, 212, 220, 0.32)","--dsw-alias-label-tertiary":"#6c828c","--dsw-alias-menu-icon":"#a5b7c1","--dsw-alias-link":"#ff9a72","--dsw-alias-markdown-citation":"#1f272b","--dsw-alias-markdown-code-block-banner":"#192125","--dsw-alias-markdown-code-block":"#11191d","--dsw-alias-markdown-code-segment-selected":"#2f383d","--dsw-alias-markdown-code-segment-unselected":"#11191d","--dsw-alias-markdown-inline-code":"#1c2428","--dsw-alias-markdown-placeholder":"#1f272b","--dsw-alias-markdown-tag":"#1e262a","--dsw-alias-scrollbar-bg-l1":"#313a3f","--dsw-alias-scrollbar-bg-l2":"#454f53","--dsw-alias-scrollbar-hover-l1":"#4d575b","--dsw-alias-scrollbar-hover-l2":"#616b70","--dsw-alias-state-business-primary":"#4a8aa3","--dsw-alias-state-business-tertiary":"rgba(74, 138, 163, 0.14)","--dsw-alias-code-diff-added":"rgba(63, 158, 127, 0.1)","--dsw-alias-code-diff-deleted":"rgba(208, 89, 90, 0.1)","--dsw-alias-file-diff-added-bg":"#122827","--dsw-alias-file-diff-added-gutter":"#0e1e1f","--dsw-alias-file-diff-added-marker":"#63c9a8","--dsw-alias-file-diff-deleted-bg":"#2a1d21","--dsw-alias-file-diff-deleted-gutter":"#1c181c","--dsw-alias-file-diff-deleted-marker":"#ea7d7e","--dsw-alias-state-error-primary":"#d0595a","--dsw-alias-state-error-secondary":"#ea7d7e","--dsw-alias-state-idle-primary":"#4d575b","--dsw-alias-state-success-primary":"#3f9e7f","--dsw-alias-state-success-secondary":"#63c9a8","--dsw-alias-state-success-tertiary":"#112424","--dsw-alias-state-warn-label":"#d6a959","--dsw-alias-state-warn-primary":"#c59a4a","--dsw-alias-state-warn-secondary":"#e3ba6a","--dsw-alias-state-warn-tertiary":"#22241d","--dsw-alias-switch-thumb":"#b0bfc7","--dsw-alias-toast-bg":"#17242a","--dsw-alias-toast-label":"#d8e4e9","--dsw-alias-tooltip-bg":"#1a292f","--dsw-alias-tooltip-key-bg":"#435054","--dsw-alias-turn-trigger-bg":"rgba(207, 220, 226, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(207, 220, 226, 0.11)","--dsw-specific-bubble-highlight":"#353637","--dsw-specific-bubble":"#272a2d","--dsw-specific-input-major":"#1f272b","--dsw-specific-login-input":"#11191d","--dsw-menu-surface-fill":"rgba(53, 62, 67, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(61, 71, 75, 0.94)","--dsw-specific-menu":"rgba(53, 62, 67, 0.46)","--dsw-specific-selector":"#293136","--dsw-specific-sidebar-fill":"#131b1f","--dsw-specific-sidebar-nav-item-active-accent":"#34302f","--dsw-specific-sidebar-nav-item-active":"#293136","--dsw-specific-sidebar-nav-item-hover":"#1f272b","--dsw-specific-tip":"#293136","--dsw-alias-settings-card-fill":"#1f272b","--dsw-alias-settings-card-stroke":"rgba(207, 220, 226, 0.23)","--dsw-alias-onboarding-accent":"#6fa9c4","--dsw-alias-onboarding-card-fill":"rgba(65, 75, 79, 0.8)","--dsw-alias-onboarding-secondary-fill":"#394247","--dsw-alias-onboarding-checkbox-border":"rgba(207, 220, 226, 0.13)"},"check":{"labelPrimaryOnBase":12.44,"labelSecondaryOnBase":6.92,"brandOnBase":3.85,"labelOnBrand":3.23,"stateOnBase":4.73,"failures":[]}},{"id":"mirage-porcelain","name":"Porcelain","colorScheme":"light","tagline":"Cool glaze, cobalt detail","description":"Cool near-white glaze with ink text and a cobalt detail accent.","tokens":{"--dsw-alias-bg-base":"#eef1f4","--dsw-alias-bg-document-preview":"#e6e9ec","--dsw-alias-bg-document-selection":"rgba(74, 120, 184, 0.4)","--dsw-alias-label-document-preview":"#55606c","--dsw-alias-bg-layer-1":"#f2f5f7","--dsw-alias-bg-layer-2":"#f5f8fa","--dsw-alias-bg-layer-3":"#f8fafb","--dsw-alias-bg-mask-1":"rgba(60, 67, 77, 0.24)","--dsw-alias-bg-mask-2":"rgba(60, 67, 77, 0.12)","--dsw-alias-bg-mask-3":"rgba(60, 67, 77, 0.48)","--dsw-alias-bg-mask-photo":"rgba(60, 67, 77, 0.88)","--dsw-alias-bg-mask-drop":"rgba(250, 252, 253, 0.72)","--dsw-alias-bg-module-platform":"#f8fafb","--dsw-alias-bg-multi-select":"#eaedf0","--dsw-alias-bg-overlay":"#f8fafc","--dsw-alias-bg-skeleton":"rgba(28, 36, 48, 0.05)","--dsw-alias-border-inverted2":"rgba(28, 36, 48, 0)","--dsw-alias-border-inverted":"rgba(28, 36, 48, 0)","--dsw-alias-border-l1":"rgba(28, 36, 48, 0.09)","--dsw-alias-border-l2-darkmode-thin":"rgba(28, 36, 48, 0.11)","--dsw-alias-border-l2":"rgba(28, 36, 48, 0.15)","--dsw-alias-border-l3":"rgba(28, 36, 48, 0.2)","--dsw-alias-border-l4":"rgba(28, 36, 48, 0.26)","--dsw-alias-brand-primary-invert":"#1c2430","--dsw-alias-brand-primary-new-colorprimary-new-color":"#4a78b8","--dsw-alias-brand-primary":"#5678b2","--dsw-alias-brand-text":"#2f5f9e","--dsw-alias-button-contrast-fill":"#1c2430","--dsw-alias-button-elevated-fill":"#f8fafb","--dsw-alias-button-floating-fill":"#f5f8fa","--dsw-alias-button-floating-hover":"#f8fafb","--dsw-alias-button-ghost-active-border":"#858b92","--dsw-alias-button-ghost-active-fill":"#f8fafb","--dsw-alias-button-ghost-active-hover":"#d5d8dc","--dsw-alias-button-info-fill":"#2f5f9e","--dsw-alias-button-info-hover":"#2d5891","--dsw-alias-button-primary-dimmed":"#cdd6e5","--dsw-alias-button-primary-fill":"#5678b2","--dsw-alias-button-primary-hover":"#6587c0","--dsw-alias-button-tool-bar-fill-invisible":"rgba(175, 180, 185, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(175, 180, 185, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(175, 180, 185, 0.6)","--dsw-alias-interactive-bg-active":"rgba(86, 120, 178, 0.14)","--dsw-alias-interactive-bg-hover-accent":"rgba(86, 120, 178, 0.18)","--dsw-alias-interactive-bg-hover-danger":"rgba(176, 66, 58, 0.1)","--dsw-alias-interactive-bg-hover-solid":"#f8fafb","--dsw-alias-interactive-bg-hover":"rgba(28, 36, 48, 0.05)","--dsw-alias-label-caption":"#8b95a1","--dsw-alias-label-deep-diving":"#3f6fb0","--dsw-alias-label-deep-diving-shimmer":"rgba(63, 111, 176, 0.35)","--dsw-alias-label-dimmed":"#c2c9d1","--dsw-alias-label-primary-bluish":"#1c3a63","--dsw-alias-label-primary-dimmed":"#323a45","--dsw-alias-label-primary-foreground":"#f7fbff","--dsw-alias-label-primary-inverted":"#fbfdfe","--dsw-alias-label-primary":"#1c2430","--dsw-alias-label-secondary":"#55606c","--dsw-alias-label-shimmer":"rgba(28, 36, 48, 0.28)","--dsw-alias-label-tertiary":"#737e8b","--dsw-alias-menu-icon":"#3b4551","--dsw-alias-link":"#2f5f9e","--dsw-alias-markdown-citation":"#e4e7ea","--dsw-alias-markdown-code-block-banner":"#e7eaed","--dsw-alias-markdown-code-block":"#e2e6e9","--dsw-alias-markdown-code-segment-selected":"#f9fbfd","--dsw-alias-markdown-code-segment-unselected":"#e2e6e9","--dsw-alias-markdown-inline-code":"#e2e6e9","--dsw-alias-markdown-placeholder":"#f5f8fa","--dsw-alias-markdown-tag":"#e1e5e8","--dsw-alias-scrollbar-bg-l1":"#ccd0d5","--dsw-alias-scrollbar-bg-l2":"#bcc0c5","--dsw-alias-scrollbar-hover-l1":"#c4c8cd","--dsw-alias-scrollbar-hover-l2":"#b3b8bd","--dsw-alias-state-business-primary":"#2f5f9e","--dsw-alias-state-business-tertiary":"rgba(47, 95, 158, 0.14)","--dsw-alias-code-diff-added":"rgba(63, 92, 62, 0.1)","--dsw-alias-code-diff-deleted":"rgba(122, 42, 37, 0.1)","--dsw-alias-file-diff-added-bg":"#dfe7e4","--dsw-alias-file-diff-added-gutter":"#eef3f2","--dsw-alias-file-diff-added-marker":"#3f5c3e","--dsw-alias-file-diff-deleted-bg":"#ebdfdf","--dsw-alias-file-diff-deleted-gutter":"#f4f0f0","--dsw-alias-file-diff-deleted-marker":"#7a2a25","--dsw-alias-state-error-primary":"#b0423a","--dsw-alias-state-error-secondary":"#c95f55","--dsw-alias-state-idle-primary":"#b7bcc1","--dsw-alias-state-success-primary":"#5b7f5a","--dsw-alias-state-success-secondary":"#769874","--dsw-alias-state-success-tertiary":"#e1e8e5","--dsw-alias-state-warn-label":"#8a5f14","--dsw-alias-state-warn-primary":"#a0701c","--dsw-alias-state-warn-secondary":"#bd8a35","--dsw-alias-state-warn-tertiary":"#eae6dd","--dsw-alias-switch-thumb":"#fcfdff","--dsw-alias-toast-bg":"#1c2430","--dsw-alias-toast-label":"#f2f6fa","--dsw-alias-tooltip-bg":"#1c2430","--dsw-alias-tooltip-key-bg":"#454b55","--dsw-alias-turn-trigger-bg":"#f3f6f8","--dsw-alias-turn-trigger-bg-hover":"#e4e7ea","--dsw-specific-bubble-highlight":"#dce4ee","--dsw-specific-bubble":"#f5f8fa","--dsw-specific-input-major":"#fbfdfe","--dsw-specific-login-input":"#e2e6e9","--dsw-menu-surface-fill":"rgba(248, 250, 252, 0.58)","--dsw-alias-menu-group-header-fill":"rgba(248, 251, 252, 0.94)","--dsw-specific-menu":"rgba(248, 250, 252, 0.58)","--dsw-specific-selector":"#f8fafb","--dsw-specific-sidebar-fill":"#e8ebee","--dsw-specific-sidebar-nav-item-active-accent":"#d9e0eb","--dsw-specific-sidebar-nav-item-active":"#ebf0f6","--dsw-specific-sidebar-nav-item-hover":"#e4e7ea","--dsw-specific-tip":"#f8fafb","--dsw-alias-settings-card-fill":"#f5f8fa","--dsw-alias-settings-card-stroke":"rgba(28, 36, 48, 0.26)","--dsw-alias-onboarding-accent":"#4a78b8","--dsw-alias-onboarding-card-fill":"rgba(250, 252, 254, 0.82)","--dsw-alias-onboarding-secondary-fill":"#fafcfd","--dsw-alias-onboarding-checkbox-border":"rgba(28, 36, 48, 0.22)"},"check":{"labelPrimaryOnBase":13.78,"labelSecondaryOnBase":5.65,"brandOnBase":3.92,"labelOnBrand":3.51,"stateOnBase":3.84,"failures":[]}},{"id":"mirage-ink","name":"Ink","colorScheme":"light","tagline":"Paper, ink, vermilion seal","description":"Neutral paper white, near-black ink and a vermilion seal accent.","tokens":{"--dsw-alias-bg-base":"#f4f2ee","--dsw-alias-bg-document-preview":"#ebe9e6","--dsw-alias-bg-document-selection":"rgba(74, 106, 154, 0.4)","--dsw-alias-label-document-preview":"#565b60","--dsw-alias-bg-layer-1":"#f7f6f2","--dsw-alias-bg-layer-2":"#faf8f5","--dsw-alias-bg-layer-3":"#fcfbf7","--dsw-alias-bg-mask-1":"rgba(56, 57, 58, 0.24)","--dsw-alias-bg-mask-2":"rgba(56, 57, 58, 0.12)","--dsw-alias-bg-mask-3":"rgba(56, 57, 58, 0.48)","--dsw-alias-bg-mask-photo":"rgba(56, 57, 58, 0.88)","--dsw-alias-bg-mask-drop":"rgba(254, 253, 250, 0.72)","--dsw-alias-bg-module-platform":"#fcfbf7","--dsw-alias-bg-multi-select":"#f0eeea","--dsw-alias-bg-overlay":"#fdfbf8","--dsw-alias-bg-skeleton":"rgba(23, 24, 26, 0.05)","--dsw-alias-border-inverted2":"rgba(23, 24, 26, 0)","--dsw-alias-border-inverted":"rgba(23, 24, 26, 0)","--dsw-alias-border-l1":"rgba(23, 24, 26, 0.09)","--dsw-alias-border-l2-darkmode-thin":"rgba(23, 24, 26, 0.12)","--dsw-alias-border-l2":"rgba(23, 24, 26, 0.16)","--dsw-alias-border-l3":"rgba(23, 24, 26, 0.22)","--dsw-alias-border-l4":"rgba(23, 24, 26, 0.3)","--dsw-alias-brand-primary-invert":"#17181a","--dsw-alias-brand-primary-new-colorprimary-new-color":"#5f7fb0","--dsw-alias-brand-primary":"#cc4b30","--dsw-alias-brand-text":"#a83420","--dsw-alias-button-contrast-fill":"#17181a","--dsw-alias-button-elevated-fill":"#fcfbf7","--dsw-alias-button-floating-fill":"#faf8f5","--dsw-alias-button-floating-hover":"#fcfbf7","--dsw-alias-button-ghost-active-border":"#868584","--dsw-alias-button-ghost-active-fill":"#fcfbf7","--dsw-alias-button-ghost-active-hover":"#d9d8d5","--dsw-alias-button-info-fill":"#4a6a9a","--dsw-alias-button-info-hover":"#44608b","--dsw-alias-button-primary-dimmed":"#ebcdc4","--dsw-alias-button-primary-fill":"#cc4b30","--dsw-alias-button-primary-hover":"#da5a3d","--dsw-alias-button-tool-bar-fill-invisible":"rgba(178, 177, 174, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(178, 177, 174, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(178, 177, 174, 0.6)","--dsw-alias-interactive-bg-active":"rgba(204, 75, 48, 0.14)","--dsw-alias-interactive-bg-hover-accent":"rgba(204, 75, 48, 0.18)","--dsw-alias-interactive-bg-hover-danger":"rgba(168, 58, 50, 0.1)","--dsw-alias-interactive-bg-hover-solid":"#fcfbf7","--dsw-alias-interactive-bg-hover":"rgba(23, 24, 26, 0.05)","--dsw-alias-label-caption":"#8c9095","--dsw-alias-label-deep-diving":"#3f5f95","--dsw-alias-label-deep-diving-shimmer":"rgba(63, 95, 149, 0.35)","--dsw-alias-label-dimmed":"#c5c2bc","--dsw-alias-label-primary-bluish":"#2a3a52","--dsw-alias-label-primary-dimmed":"#2e2f31","--dsw-alias-label-primary-foreground":"#fbf7f0","--dsw-alias-label-primary-inverted":"#fffefb","--dsw-alias-label-primary":"#17181a","--dsw-alias-label-secondary":"#565b60","--dsw-alias-label-shimmer":"rgba(23, 24, 26, 0.28)","--dsw-alias-label-tertiary":"#74787d","--dsw-alias-menu-icon":"#3a3d41","--dsw-alias-link":"#a83420","--dsw-alias-markdown-citation":"#e9e7e3","--dsw-alias-markdown-code-block-banner":"#eceae7","--dsw-alias-markdown-code-block":"#e8e6e2","--dsw-alias-markdown-code-segment-selected":"#fdfcf9","--dsw-alias-markdown-code-segment-unselected":"#e8e6e2","--dsw-alias-markdown-inline-code":"#e8e6e2","--dsw-alias-markdown-placeholder":"#faf8f5","--dsw-alias-markdown-tag":"#e7e5e1","--dsw-alias-scrollbar-bg-l1":"#d1cfcc","--dsw-alias-scrollbar-bg-l2":"#bfbebb","--dsw-alias-scrollbar-hover-l1":"#c8c6c4","--dsw-alias-scrollbar-hover-l2":"#b6b5b3","--dsw-alias-state-business-primary":"#4a6a9a","--dsw-alias-state-business-tertiary":"rgba(74, 106, 154, 0.14)","--dsw-alias-code-diff-added":"rgba(58, 79, 53, 0.1)","--dsw-alias-code-diff-deleted":"rgba(117, 36, 31, 0.1)","--dsw-alias-file-diff-added-bg":"#e3e6de","--dsw-alias-file-diff-added-gutter":"#f2f3ee","--dsw-alias-file-diff-added-marker":"#3a4f35","--dsw-alias-file-diff-deleted-bg":"#efdeda","--dsw-alias-file-diff-deleted-gutter":"#f8f0ec","--dsw-alias-file-diff-deleted-marker":"#75241f","--dsw-alias-state-error-primary":"#a83a32","--dsw-alias-state-error-secondary":"#c2574d","--dsw-alias-state-idle-primary":"#bbb9b7","--dsw-alias-state-success-primary":"#55704f","--dsw-alias-state-success-secondary":"#728c6a","--dsw-alias-state-success-tertiary":"#e5e7df","--dsw-alias-state-warn-label":"#7f5b10","--dsw-alias-state-warn-primary":"#9a7016","--dsw-alias-state-warn-secondary":"#b88a30","--dsw-alias-state-warn-tertiary":"#eee7d8","--dsw-alias-switch-thumb":"#fffefb","--dsw-alias-toast-bg":"#17181a","--dsw-alias-toast-label":"#f5f2ec","--dsw-alias-tooltip-bg":"#17181a","--dsw-alias-tooltip-key-bg":"#414243","--dsw-alias-turn-trigger-bg":"#f8f7f3","--dsw-alias-turn-trigger-bg-hover":"#e9e7e3","--dsw-specific-bubble-highlight":"#f3ddd5","--dsw-specific-bubble":"#faf9f5","--dsw-specific-input-major":"#fffefb","--dsw-specific-login-input":"#e8e6e2","--dsw-menu-surface-fill":"rgba(252, 251, 248, 0.58)","--dsw-alias-menu-group-header-fill":"rgba(253, 252, 248, 0.94)","--dsw-specific-menu":"rgba(252, 251, 248, 0.58)","--dsw-specific-selector":"#fcfbf7","--dsw-specific-sidebar-fill":"#edebe8","--dsw-specific-sidebar-nav-item-active-accent":"#eedbd3","--dsw-specific-sidebar-nav-item-active":"#f7efe9","--dsw-specific-sidebar-nav-item-hover":"#e9e7e3","--dsw-specific-tip":"#fcfbf7","--dsw-alias-settings-card-fill":"#faf8f5","--dsw-alias-settings-card-stroke":"rgba(23, 24, 26, 0.3)","--dsw-alias-onboarding-accent":"#5f7fb0","--dsw-alias-onboarding-card-fill":"rgba(254, 253, 250, 0.82)","--dsw-alias-onboarding-secondary-fill":"#fefdfa","--dsw-alias-onboarding-checkbox-border":"rgba(23, 24, 26, 0.22)"},"check":{"labelPrimaryOnBase":15.89,"labelSecondaryOnBase":6.14,"brandOnBase":4.07,"labelOnBrand":3.91,"stateOnBase":3.99,"failures":[]}},{"id":"mirage-mochi","name":"Mochi","colorScheme":"dark","tagline":"Cocoa and mauve pastels","description":"Warm dark cocoa surfaces with a dusty mauve accent and pastel text.","tokens":{"--dsw-alias-bg-base":"#1a1415","--dsw-alias-bg-document-preview":"#1a1415","--dsw-alias-bg-document-selection":"rgba(197, 140, 163, 0.4)","--dsw-alias-label-document-preview":"#b09c9f","--dsw-alias-bg-layer-1":"#251e1f","--dsw-alias-bg-layer-2":"#2f2729","--dsw-alias-bg-layer-3":"#393132","--dsw-alias-bg-mask-1":"rgba(7, 6, 6, 0.24)","--dsw-alias-bg-mask-2":"rgba(7, 6, 6, 0.12)","--dsw-alias-bg-mask-3":"rgba(7, 6, 6, 0.48)","--dsw-alias-bg-mask-photo":"rgba(7, 6, 6, 0.88)","--dsw-alias-bg-mask-drop":"rgba(81, 72, 74, 0.7)","--dsw-alias-bg-module-platform":"#393132","--dsw-alias-bg-multi-select":"#221b1d","--dsw-alias-bg-overlay":"#51484a","--dsw-alias-bg-skeleton":"rgba(224, 205, 211, 0.06)","--dsw-alias-border-inverted2":"rgba(224, 205, 211, 0.08)","--dsw-alias-border-inverted":"rgba(224, 205, 211, 0.06)","--dsw-alias-border-l1":"rgba(224, 205, 211, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(224, 205, 211, 0.08)","--dsw-alias-border-l2":"rgba(224, 205, 211, 0.13)","--dsw-alias-border-l3":"rgba(224, 205, 211, 0.18)","--dsw-alias-border-l4":"rgba(224, 205, 211, 0.23)","--dsw-alias-brand-primary-invert":"#e8dcde","--dsw-alias-brand-primary-new-colorprimary-new-color":"#8a9cb2","--dsw-alias-brand-primary":"#a06c80","--dsw-alias-brand-text":"#e2b9c7","--dsw-alias-button-contrast-fill":"#ead9de","--dsw-alias-button-elevated-fill":"#393132","--dsw-alias-button-floating-fill":"#2f2729","--dsw-alias-button-floating-hover":"#393132","--dsw-alias-button-ghost-active-border":"#7d7174","--dsw-alias-button-ghost-active-fill":"#393132","--dsw-alias-button-ghost-active-hover":"#4a4043","--dsw-alias-button-info-fill":"#64748a","--dsw-alias-button-info-hover":"#7d8699","--dsw-alias-button-primary-dimmed":"#684753","--dsw-alias-button-primary-fill":"#a06c80","--dsw-alias-button-primary-hover":"#b47e92","--dsw-alias-button-tool-bar-fill-invisible":"rgba(85, 76, 78, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(85, 76, 78, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(85, 76, 78, 0.6)","--dsw-alias-interactive-bg-active":"rgba(160, 108, 128, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(160, 108, 128, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(179, 95, 90, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#393132","--dsw-alias-interactive-bg-hover":"rgba(224, 205, 211, 0.07)","--dsw-alias-label-caption":"#776669","--dsw-alias-label-deep-diving":"#c58ca3","--dsw-alias-label-deep-diving-shimmer":"rgba(197, 140, 163, 0.35)","--dsw-alias-label-dimmed":"#4d3f41","--dsw-alias-label-primary-bluish":"#e8dcde","--dsw-alias-label-primary-dimmed":"#cfc4c6","--dsw-alias-label-primary-foreground":"#201014","--dsw-alias-label-primary-inverted":"#362e30","--dsw-alias-label-primary":"#e8dcde","--dsw-alias-label-secondary":"#b09c9f","--dsw-alias-label-shimmer":"rgba(232, 220, 222, 0.32)","--dsw-alias-label-tertiary":"#8d787b","--dsw-alias-menu-icon":"#c9b9bb","--dsw-alias-link":"#d3a3b3","--dsw-alias-markdown-citation":"#2f2729","--dsw-alias-markdown-code-block-banner":"#292223","--dsw-alias-markdown-code-block":"#211a1c","--dsw-alias-markdown-code-segment-selected":"#403739","--dsw-alias-markdown-code-segment-unselected":"#211a1c","--dsw-alias-markdown-inline-code":"#2c2526","--dsw-alias-markdown-placeholder":"#2f2729","--dsw-alias-markdown-tag":"#2e2728","--dsw-alias-scrollbar-bg-l1":"#42393b","--dsw-alias-scrollbar-bg-l2":"#554c4e","--dsw-alias-scrollbar-hover-l1":"#5d5356","--dsw-alias-scrollbar-hover-l2":"#716569","--dsw-alias-state-business-primary":"#7a6a94","--dsw-alias-state-business-tertiary":"rgba(122, 106, 148, 0.14)","--dsw-alias-code-diff-added":"rgba(127, 146, 112, 0.1)","--dsw-alias-code-diff-deleted":"rgba(179, 95, 90, 0.1)","--dsw-alias-file-diff-added-bg":"#2a2824","--dsw-alias-file-diff-added-gutter":"#231f1d","--dsw-alias-file-diff-added-marker":"#a0b08f","--dsw-alias-file-diff-deleted-bg":"#322020","--dsw-alias-file-diff-deleted-gutter":"#271b1b","--dsw-alias-file-diff-deleted-marker":"#cd7f79","--dsw-alias-state-error-primary":"#b35f5a","--dsw-alias-state-error-secondary":"#cd7f79","--dsw-alias-state-idle-primary":"#5d5356","--dsw-alias-state-success-primary":"#7f9270","--dsw-alias-state-success-secondary":"#a0b08f","--dsw-alias-state-success-tertiary":"#272421","--dsw-alias-state-warn-label":"#c39a62","--dsw-alias-state-warn-primary":"#b08a50","--dsw-alias-state-warn-secondary":"#cfae76","--dsw-alias-state-warn-tertiary":"#2e231d","--dsw-alias-switch-thumb":"#cbb4ba","--dsw-alias-toast-bg":"#2a2122","--dsw-alias-toast-label":"#f0e4e4","--dsw-alias-tooltip-bg":"#2e2425","--dsw-alias-tooltip-key-bg":"#544b4c","--dsw-alias-turn-trigger-bg":"rgba(224, 205, 211, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(224, 205, 211, 0.11)","--dsw-specific-bubble-highlight":"#43373a","--dsw-specific-bubble":"#362b2e","--dsw-specific-input-major":"#2f2729","--dsw-specific-login-input":"#211a1c","--dsw-menu-surface-fill":"rgba(70, 61, 63, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(77, 68, 70, 0.94)","--dsw-specific-menu":"rgba(70, 61, 63, 0.46)","--dsw-specific-selector":"#393132","--dsw-specific-sidebar-fill":"#231c1e","--dsw-specific-sidebar-nav-item-active-accent":"#413237","--dsw-specific-sidebar-nav-item-active":"#393132","--dsw-specific-sidebar-nav-item-hover":"#2f2729","--dsw-specific-tip":"#393132","--dsw-alias-settings-card-fill":"#2f2729","--dsw-alias-settings-card-stroke":"rgba(224, 205, 211, 0.23)","--dsw-alias-onboarding-accent":"#c58ca3","--dsw-alias-onboarding-card-fill":"rgba(81, 72, 74, 0.8)","--dsw-alias-onboarding-secondary-fill":"#4a4043","--dsw-alias-onboarding-checkbox-border":"rgba(224, 205, 211, 0.13)"},"check":{"labelPrimaryOnBase":13.62,"labelSecondaryOnBase":7.02,"brandOnBase":4.29,"labelOnBrand":3.18,"stateOnBase":4.07,"failures":[]}},{"id":"mirage-ember","name":"Ember","colorScheme":"dark","tagline":"Amber lamplight for late reading","description":"Warm near-black with amber lamplight and soft cream text for late reading.","tokens":{"--dsw-alias-bg-base":"#14100b","--dsw-alias-bg-document-preview":"#14100b","--dsw-alias-bg-document-selection":"rgba(232, 183, 90, 0.4)","--dsw-alias-label-document-preview":"#b3a189","--dsw-alias-bg-layer-1":"#201b15","--dsw-alias-bg-layer-2":"#2a251e","--dsw-alias-bg-layer-3":"#352f27","--dsw-alias-bg-mask-1":"rgba(6, 4, 3, 0.24)","--dsw-alias-bg-mask-2":"rgba(6, 4, 3, 0.12)","--dsw-alias-bg-mask-3":"rgba(6, 4, 3, 0.48)","--dsw-alias-bg-mask-photo":"rgba(6, 4, 3, 0.88)","--dsw-alias-bg-mask-drop":"rgba(79, 71, 61, 0.7)","--dsw-alias-bg-module-platform":"#352f27","--dsw-alias-bg-multi-select":"#1c1812","--dsw-alias-bg-overlay":"#4f473d","--dsw-alias-bg-skeleton":"rgba(232, 214, 189, 0.06)","--dsw-alias-border-inverted2":"rgba(232, 214, 189, 0.08)","--dsw-alias-border-inverted":"rgba(232, 214, 189, 0.06)","--dsw-alias-border-l1":"rgba(232, 214, 189, 0.08)","--dsw-alias-border-l2-darkmode-thin":"rgba(232, 214, 189, 0.08)","--dsw-alias-border-l2":"rgba(232, 214, 189, 0.13)","--dsw-alias-border-l3":"rgba(232, 214, 189, 0.18)","--dsw-alias-border-l4":"rgba(232, 214, 189, 0.23)","--dsw-alias-brand-primary-invert":"#e6d7c2","--dsw-alias-brand-primary-new-colorprimary-new-color":"#8aa0b8","--dsw-alias-brand-primary":"#9c6f16","--dsw-alias-brand-text":"#f0c876","--dsw-alias-button-contrast-fill":"#efe0c8","--dsw-alias-button-elevated-fill":"#352f27","--dsw-alias-button-floating-fill":"#2a251e","--dsw-alias-button-floating-hover":"#352f27","--dsw-alias-button-ghost-active-border":"#7e7364","--dsw-alias-button-ghost-active-fill":"#352f27","--dsw-alias-button-ghost-active-hover":"#474036","--dsw-alias-button-info-fill":"#5a7088","--dsw-alias-button-info-hover":"#768493","--dsw-alias-button-primary-dimmed":"#634711","--dsw-alias-button-primary-fill":"#9c6f16","--dsw-alias-button-primary-hover":"#b0811e","--dsw-alias-button-tool-bar-fill-invisible":"rgba(84, 75, 64, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(84, 75, 64, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(84, 75, 64, 0.6)","--dsw-alias-interactive-bg-active":"rgba(156, 111, 22, 0.16)","--dsw-alias-interactive-bg-hover-accent":"rgba(156, 111, 22, 0.22)","--dsw-alias-interactive-bg-hover-danger":"rgba(192, 90, 69, 0.12)","--dsw-alias-interactive-bg-hover-solid":"#352f27","--dsw-alias-interactive-bg-hover":"rgba(232, 214, 189, 0.07)","--dsw-alias-label-caption":"#786957","--dsw-alias-label-deep-diving":"#d9b06a","--dsw-alias-label-deep-diving-shimmer":"rgba(217, 176, 106, 0.35)","--dsw-alias-label-dimmed":"#4e4437","--dsw-alias-label-primary-bluish":"#e6d7c2","--dsw-alias-label-primary-dimmed":"#cdbfac","--dsw-alias-label-primary-foreground":"#1c1206","--dsw-alias-label-primary-inverted":"#322c24","--dsw-alias-label-primary":"#e6d7c2","--dsw-alias-label-secondary":"#b3a189","--dsw-alias-label-shimmer":"rgba(230, 215, 194, 0.32)","--dsw-alias-label-tertiary":"#8f7e69","--dsw-alias-menu-icon":"#cab9a3","--dsw-alias-link":"#e8b25a","--dsw-alias-markdown-citation":"#2a251e","--dsw-alias-markdown-code-block-banner":"#241f18","--dsw-alias-markdown-code-block":"#1b1711","--dsw-alias-markdown-code-segment-selected":"#3c362d","--dsw-alias-markdown-code-segment-unselected":"#1b1711","--dsw-alias-markdown-inline-code":"#27221b","--dsw-alias-markdown-placeholder":"#2a251e","--dsw-alias-markdown-tag":"#29241d","--dsw-alias-scrollbar-bg-l1":"#3e382f","--dsw-alias-scrollbar-bg-l2":"#544b40","--dsw-alias-scrollbar-hover-l1":"#5c5348","--dsw-alias-scrollbar-hover-l2":"#716759","--dsw-alias-state-business-primary":"#8a7a4a","--dsw-alias-state-business-tertiary":"rgba(138, 122, 74, 0.14)","--dsw-alias-code-diff-added":"rgba(111, 146, 86, 0.1)","--dsw-alias-code-diff-deleted":"rgba(192, 90, 69, 0.1)","--dsw-alias-file-diff-added-bg":"#232517","--dsw-alias-file-diff-added-gutter":"#1c1c12","--dsw-alias-file-diff-added-marker":"#90b578","--dsw-alias-file-diff-deleted-bg":"#301c14","--dsw-alias-file-diff-deleted-gutter":"#231710","--dsw-alias-file-diff-deleted-marker":"#dc7c66","--dsw-alias-state-error-primary":"#c05a45","--dsw-alias-state-error-secondary":"#dc7c66","--dsw-alias-state-idle-primary":"#5c5348","--dsw-alias-state-success-primary":"#6f9256","--dsw-alias-state-success-secondary":"#90b578","--dsw-alias-state-success-tertiary":"#202115","--dsw-alias-state-warn-label":"#d18f45","--dsw-alias-state-warn-primary":"#c07a2e","--dsw-alias-state-warn-secondary":"#dd9a4f","--dsw-alias-state-warn-tertiary":"#2a1e10","--dsw-alias-switch-thumb":"#cdb99d","--dsw-alias-toast-bg":"#2a2118","--dsw-alias-toast-label":"#f2e6d4","--dsw-alias-tooltip-bg":"#2e2419","--dsw-alias-tooltip-key-bg":"#544b42","--dsw-alias-turn-trigger-bg":"rgba(232, 214, 189, 0.07)","--dsw-alias-turn-trigger-bg-hover":"rgba(232, 214, 189, 0.11)","--dsw-specific-bubble-highlight":"#3f3525","--dsw-specific-bubble":"#31291e","--dsw-specific-input-major":"#2a251e","--dsw-specific-login-input":"#1b1711","--dsw-menu-surface-fill":"rgba(67, 60, 50, 0.46)","--dsw-alias-menu-group-header-fill":"rgba(75, 67, 57, 0.94)","--dsw-specific-menu":"rgba(67, 60, 50, 0.46)","--dsw-specific-selector":"#352f27","--dsw-specific-sidebar-fill":"#1e1913","--dsw-specific-sidebar-nav-item-active-accent":"#3c311d","--dsw-specific-sidebar-nav-item-active":"#352f27","--dsw-specific-sidebar-nav-item-hover":"#2a251e","--dsw-specific-tip":"#352f27","--dsw-alias-settings-card-fill":"#2a251e","--dsw-alias-settings-card-stroke":"rgba(232, 214, 189, 0.23)","--dsw-alias-onboarding-accent":"#c9a052","--dsw-alias-onboarding-card-fill":"rgba(79, 71, 61, 0.8)","--dsw-alias-onboarding-secondary-fill":"#474036","--dsw-alias-onboarding-checkbox-border":"rgba(232, 214, 189, 0.13)"},"check":{"labelPrimaryOnBase":13.41,"labelSecondaryOnBase":7.55,"brandOnBase":4.24,"labelOnBrand":3.16,"stateOnBase":4.32,"failures":[]}},{"id":"mirage-lumen","name":"Lumen","colorScheme":"light","tagline":"Soft daylight, green accent","description":"Soft green-tinted daylight with no pure white, low glare and a leaf green accent.","tokens":{"--dsw-alias-bg-base":"#eaf1e8","--dsw-alias-bg-document-preview":"#e3e9e1","--dsw-alias-bg-document-selection":"rgba(74, 106, 134, 0.4)","--dsw-alias-label-document-preview":"#59635a","--dsw-alias-bg-layer-1":"#eff5ec","--dsw-alias-bg-layer-2":"#f2f7ee","--dsw-alias-bg-layer-3":"#f4f9f0","--dsw-alias-bg-mask-1":"rgba(75, 81, 74, 0.24)","--dsw-alias-bg-mask-2":"rgba(75, 81, 74, 0.12)","--dsw-alias-bg-mask-3":"rgba(75, 81, 74, 0.48)","--dsw-alias-bg-mask-photo":"rgba(75, 81, 74, 0.88)","--dsw-alias-bg-mask-drop":"rgba(246, 250, 242, 0.72)","--dsw-alias-bg-module-platform":"#f4f9f0","--dsw-alias-bg-multi-select":"#e6ede4","--dsw-alias-bg-overlay":"#f4f9f1","--dsw-alias-bg-skeleton":"rgba(47, 53, 46, 0.05)","--dsw-alias-border-inverted2":"rgba(47, 53, 46, 0)","--dsw-alias-border-inverted":"rgba(47, 53, 46, 0)","--dsw-alias-border-l1":"rgba(47, 53, 46, 0.07)","--dsw-alias-border-l2-darkmode-thin":"rgba(47, 53, 46, 0.07)","--dsw-alias-border-l2":"rgba(47, 53, 46, 0.11)","--dsw-alias-border-l3":"rgba(47, 53, 46, 0.15)","--dsw-alias-border-l4":"rgba(47, 53, 46, 0.19)","--dsw-alias-brand-primary-invert":"#2f352e","--dsw-alias-brand-primary-new-colorprimary-new-color":"#3f7a6a","--dsw-alias-brand-primary":"#4f8f4f","--dsw-alias-brand-text":"#386f38","--dsw-alias-button-contrast-fill":"#2f352e","--dsw-alias-button-elevated-fill":"#f4f9f0","--dsw-alias-button-floating-fill":"#f2f7ee","--dsw-alias-button-floating-hover":"#f4f9f0","--dsw-alias-button-ghost-active-border":"#8d938b","--dsw-alias-button-ghost-active-fill":"#f4f9f0","--dsw-alias-button-ghost-active-hover":"#d4dad2","--dsw-alias-button-info-fill":"#4a6a86","--dsw-alias-button-info-hover":"#47647b","--dsw-alias-button-primary-dimmed":"#c8dbc6","--dsw-alias-button-primary-fill":"#4f8f4f","--dsw-alias-button-primary-hover":"#5d9f5d","--dsw-alias-button-tool-bar-fill-invisible":"rgba(178, 185, 176, 0.36)","--dsw-alias-button-tool-bar-fill":"rgba(178, 185, 176, 0.5)","--dsw-alias-button-tool-bar-hover":"rgba(178, 185, 176, 0.6)","--dsw-alias-interactive-bg-active":"rgba(79, 143, 79, 0.14)","--dsw-alias-interactive-bg-hover-accent":"rgba(79, 143, 79, 0.18)","--dsw-alias-interactive-bg-hover-danger":"rgba(168, 74, 58, 0.1)","--dsw-alias-interactive-bg-hover-solid":"#f4f9f0","--dsw-alias-interactive-bg-hover":"rgba(47, 53, 46, 0.05)","--dsw-alias-label-caption":"#8a9286","--dsw-alias-label-deep-diving":"#3f7a6a","--dsw-alias-label-deep-diving-shimmer":"rgba(63, 122, 106, 0.35)","--dsw-alias-label-dimmed":"#c2c9bd","--dsw-alias-label-primary-bluish":"#33523f","--dsw-alias-label-primary-dimmed":"#434942","--dsw-alias-label-primary-foreground":"#f7faf2","--dsw-alias-label-primary-inverted":"#f7fbf3","--dsw-alias-label-primary":"#2f352e","--dsw-alias-label-secondary":"#59635a","--dsw-alias-label-shimmer":"rgba(47, 53, 46, 0.28)","--dsw-alias-label-tertiary":"#727c70","--dsw-alias-menu-icon":"#464e46","--dsw-alias-link":"#3d7a4d","--dsw-alias-markdown-citation":"#e1e8df","--dsw-alias-markdown-code-block-banner":"#e3eae1","--dsw-alias-markdown-code-block":"#e0e7de","--dsw-alias-markdown-code-segment-selected":"#f5faf1","--dsw-alias-markdown-code-segment-unselected":"#e0e7de","--dsw-alias-markdown-inline-code":"#e0e7de","--dsw-alias-markdown-placeholder":"#f2f7ee","--dsw-alias-markdown-tag":"#dfe6dd","--dsw-alias-scrollbar-bg-l1":"#ccd3ca","--dsw-alias-scrollbar-bg-l2":"#bdc4bb","--dsw-alias-scrollbar-hover-l1":"#c5cbc3","--dsw-alias-scrollbar-hover-l2":"#b6bcb4","--dsw-alias-state-business-primary":"#4a6a86","--dsw-alias-state-business-tertiary":"rgba(74, 106, 134, 0.14)","--dsw-alias-code-diff-added":"rgba(56, 111, 56, 0.1)","--dsw-alias-code-diff-deleted":"rgba(120, 52, 40, 0.1)","--dsw-alias-file-diff-added-bg":"#dae8d8","--dsw-alias-file-diff-added-gutter":"#eaf2e7","--dsw-alias-file-diff-added-marker":"#386f38","--dsw-alias-file-diff-deleted-bg":"#e7dfd5","--dsw-alias-file-diff-deleted-gutter":"#f0eee6","--dsw-alias-file-diff-deleted-marker":"#783428","--dsw-alias-state-error-primary":"#a84a3a","--dsw-alias-state-error-secondary":"#c06350","--dsw-alias-state-idle-primary":"#b9c0b8","--dsw-alias-state-success-primary":"#4f8f4f","--dsw-alias-state-success-secondary":"#6ba96b","--dsw-alias-state-success-tertiary":"#dce9d9","--dsw-alias-state-warn-label":"#7f5f14","--dsw-alias-state-warn-primary":"#9a7420","--dsw-alias-state-warn-secondary":"#b98f38","--dsw-alias-state-warn-tertiary":"#e6e6d3","--dsw-alias-switch-thumb":"#f9fbf6","--dsw-alias-toast-bg":"#2f352e","--dsw-alias-toast-label":"#f2f7ee","--dsw-alias-tooltip-bg":"#2f352e","--dsw-alias-tooltip-key-bg":"#545954","--dsw-alias-turn-trigger-bg":"#eff5ec","--dsw-alias-turn-trigger-bg-hover":"#e1e8df","--dsw-specific-bubble-highlight":"#d7e6d5","--dsw-specific-bubble":"#f1f7ee","--dsw-specific-input-major":"#f7fbf3","--dsw-specific-login-input":"#e0e7de","--dsw-menu-surface-fill":"rgba(244, 249, 240, 0.58)","--dsw-alias-menu-group-header-fill":"rgba(244, 249, 241, 0.94)","--dsw-specific-menu":"rgba(244, 249, 240, 0.58)","--dsw-specific-selector":"#f4f9f0","--dsw-specific-sidebar-fill":"#e4ebe2","--dsw-specific-sidebar-nav-item-active-accent":"#d4e3d3","--dsw-specific-sidebar-nav-item-active":"#e7f1e4","--dsw-specific-sidebar-nav-item-hover":"#e1e8df","--dsw-specific-tip":"#f4f9f0","--dsw-alias-settings-card-fill":"#f2f7ee","--dsw-alias-settings-card-stroke":"rgba(47, 53, 46, 0.19)","--dsw-alias-onboarding-accent":"#3f7a6a","--dsw-alias-onboarding-card-fill":"rgba(246, 251, 242, 0.82)","--dsw-alias-onboarding-secondary-fill":"#f6faf2","--dsw-alias-onboarding-checkbox-border":"rgba(47, 53, 46, 0.22)"},"check":{"labelPrimaryOnBase":10.93,"labelSecondaryOnBase":5.43,"brandOnBase":3.39,"labelOnBrand":3.22,"stateOnBase":3.39,"failures":[]}}]}]};

    // Runtime palette engine. Inlined by the build in one scope: palette-core
    // first, pixel-theme second, so pixel-theme can call core helpers directly.
    const ENGINE = (function () {
      // palette-core.mjs
// Pure color math and the 119-token palette engine for H4X0R Themes v2.
// No imports, no DOM, no module side effects. The client build strips the
// leading `export ` from each declaration and inlines this file, so every
// statement is a plain const or function declaration. All colors are derived in
// OKLCH from a compact recipe. Surface, border, label, code, diff, menu and
// sidebar roles keep the curated make-themes relationships. Alpha roles are
// literal rgba() strings.
//
// Role data: <prefix><name without prefix>=<derived slot>. Prefix 0 is
// --dsw-alias-, 1 is --dsw-specific-, 2 is --dsw-menu-.
const pcRoleData =
  '0bg-base=base,0bg-document-preview=dp,0bg-document-selection=sl,0label-document-preview=ts,0bg-layer-1=l1,0bg-layer-2=l2,0bg-layer-3=l3,0bg-mask-1=m1,0bg-mask-2=m2,0bg-mask-3=m3,0bg-mask-photo=mp,0bg-mask-drop=md,0bg-module-platform=l3,0bg-multi-select=mu,0bg-overlay=ov,0bg-skeleton=sk,0border-inverted2=bi2,0border-inverted=bi,0border-l1=b1,0border-l2-darkmode-thin=btn,0border-l2=b2,0border-l3=b3,0border-l4=b4,0brand-primary-invert=bri,0brand-primary-new-colorprimary-new-color=ac,0brand-primary=br,0brand-text=bt,0button-contrast-fill=cf,0button-elevated-fill=l3,0button-floating-fill=l2,0button-floating-hover=l3,0button-ghost-active-border=gb,0button-ghost-active-fill=l3,0button-ghost-active-hover=gh,0button-info-fill=if,0button-info-hover=ih,0button-primary-dimmed=bd,0button-primary-fill=br,0button-primary-hover=bh,0button-tool-bar-fill-invisible=ti,0button-tool-bar-fill=tf,0button-tool-bar-hover=th,0interactive-bg-active=ia,0interactive-bg-hover-accent=iac,0interactive-bg-hover-danger=iad,0interactive-bg-hover-solid=l3,0interactive-bg-hover=ihv,0label-caption=tc,0label-deep-diving=dd,0label-deep-diving-shimmer=dds,0label-dimmed=td,0label-primary-bluish=bl,0label-primary-dimmed=tpd,0label-primary-foreground=ob,0label-primary-inverted=oi,0label-primary=tp,0label-secondary=ts,0label-shimmer=ls,0label-tertiary=tt,0menu-icon=mi,0link=lk,0markdown-citation=ci,0markdown-code-block-banner=cb,0markdown-code-block=cod,0markdown-code-segment-selected=csel,0markdown-code-segment-unselected=cod,0markdown-inline-code=ic,0markdown-placeholder=l2,0markdown-tag=tag,0scrollbar-bg-l1=s1,0scrollbar-bg-l2=s2,0scrollbar-hover-l1=sh1,0scrollbar-hover-l2=sh2,0state-business-primary=bs,0state-business-tertiary=bss,0code-diff-added=dai,0code-diff-deleted=ddi,0file-diff-added-bg=dab,0file-diff-added-gutter=dag,0file-diff-added-marker=dam,0file-diff-deleted-bg=ddb,0file-diff-deleted-gutter=ddg,0file-diff-deleted-marker=ddm,0state-error-primary=er,0state-error-secondary=erb,0state-idle-primary=id,0state-success-primary=su,0state-success-secondary=sub,0state-success-tertiary=sus,0state-warn-label=wat,0state-warn-primary=wa,0state-warn-secondary=wab,0state-warn-tertiary=was,0switch-thumb=sw,0toast-bg=tbg,0toast-label=tbl,0tooltip-bg=tip,0tooltip-key-bg=tipk,0turn-trigger-bg=tr,0turn-trigger-bg-hover=trh,1bubble-highlight=buh,1bubble=bu,1input-major=inm,1login-input=lin,2surface-fill=msf,0menu-group-header-fill=mgf,1menu=msf,1selector=l3,1sidebar-fill=sbf,1sidebar-nav-item-active-accent=sba,1sidebar-nav-item-active=sact,1sidebar-nav-item-hover=sbh,1tip=l3,0settings-card-fill=scf,0settings-card-stroke=b4,0onboarding-accent=oa,0onboarding-card-fill=oc,0onboarding-secondary-fill=os,0onboarding-checkbox-border=ckb';

const pcRoles = pcRoleData.split(',').map((e) => {
  const i = e.indexOf('=');
  const prefix = e[0] === '1' ? 'specific' : e[0] === '2' ? 'menu' : 'alias';
  return ['--dsw-' + prefix + '-' + e.slice(1, i), e.slice(i + 1)];
});

/** All 119 override eligible token names, in token-inventory.json order. */
function roleTokenNames() {
  return pcRoles.map((r) => r[0]);
}

/* ------------------------------------------------------------------ */
/* color math                                                          */
/* ------------------------------------------------------------------ */

function pcParse(v) {
  if (Array.isArray(v)) return { r: +v[0], g: +v[1], b: +v[2], a: v.length > 3 ? +v[3] : 1 };
  if (v && typeof v === 'object' && typeof v.r === 'number') return { r: +v.r, g: +v.g, b: +v.b, a: typeof v.a === 'number' ? v.a : 1 };
  const s = String(v == null ? '' : v).trim();
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    if (h.length === 6 || h.length === 8) {
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
    }
  }
  m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean);
    const ch = (x) => (x.slice(-1) === '%' ? (parseFloat(x) / 100) * 255 : parseFloat(x));
    const al = (x) => (x == null ? 1 : x.slice(-1) === '%' ? parseFloat(x) / 100 : parseFloat(x));
    if (p.length >= 3) {
      const c = { r: ch(p[0]), g: ch(p[1]), b: ch(p[2]), a: p.length > 3 ? al(p[3]) : 1 };
      if ([c.r, c.g, c.b, c.a].every((n) => Number.isFinite(n))) return c;
    }
  }
  throw new Error('palette-core: not a color: ' + s);
}

const pcLin = (v) => {
  const s = clamp(v, 0, 255) / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const pcDel = (v) => {
  const s = clamp(v, 0, 1);
  return s <= 0.0031308 ? s * 12.92 : 1.055 * Math.pow(s, 1 / 2.4) - 0.055;
};

function pcRgb01(o) {
  const rad = ((Number(o.h) || 0) * Math.PI) / 180;
  const a = (Number(o.c) || 0) * Math.cos(rad);
  const b = (Number(o.c) || 0) * Math.sin(rad);
  const L = clamp(Number(o.l), 0, 1);
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [pcDel(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), pcDel(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), pcDel(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)];
}

const pcOklch = (l, c, h) => oklchToSrgb({ l: clamp(l, 0.02, 0.992), c: Math.max(0, c), h });
const pcR2 = (n) => Math.round(Number(n) * 100) / 100;

function pcRgba(color, alpha) {
  const c = pcParse(color);
  return 'rgba(' + Math.round(clamp(c.r, 0, 255)) + ', ' + Math.round(clamp(c.g, 0, 255)) + ', ' + Math.round(clamp(c.b, 0, 255)) + ', ' + Number(clamp(alpha, 0, 1).toFixed(3)) + ')';
}

function pcShiftL(color, delta, cap) {
  const o = srgbToOklch(color);
  const l = o.l + delta;
  return pcOklch(cap == null ? l : Math.min(l, cap), o.c, o.h);
}

function luminance(color) {
  const c = pcParse(color);
  return 0.2126 * pcLin(c.r) + 0.7152 * pcLin(c.g) + 0.0722 * pcLin(c.b);
}

function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

function hexToRgb(hex) {
  const c = pcParse(hex);
  return [Math.round(clamp(c.r, 0, 255)), Math.round(clamp(c.g, 0, 255)), Math.round(clamp(c.b, 0, 255))];
}

function rgbToHex(rgb) {
  const c = pcParse(rgb);
  return '#' + [c.r, c.g, c.b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
}

function srgbToOklch(color) {
  const c = pcParse(color);
  const r = pcLin(c.r);
  const g = pcLin(c.g);
  const b = pcLin(c.b);
  const l1 = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m1 = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s1 = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l1 + 0.793617785 * m1 - 0.0040720468 * s1;
  const a = 1.9779984951 * l1 - 2.428592205 * m1 + 0.4505937099 * s1;
  const bb = 0.0259040371 * l1 + 0.7827717662 * m1 - 0.808675766 * s1;
  let hue = (Math.atan2(bb, a) * 180) / Math.PI;
  if (hue < 0) hue += 360;
  return { l: clamp(L, 0, 1), c: Math.hypot(a, bb), h: hue };
}

function oklchToSrgb(oklch) {
  const l = clamp(Number(oklch && oklch.l), 0, 1);
  let c = Math.max(0, Number(oklch && oklch.c) || 0);
  const h = ((Number(oklch && oklch.h) || 0) % 360 + 360) % 360;
  const fits = (cc) => {
    const rgb = pcRgb01({ l, c: cc, h });
    return rgb.every((v) => v >= -0.0005 && v <= 1.0005);
  };
  if (!fits(c)) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 24; i += 1) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    c = lo;
  }
  return '#' + pcRgb01({ l, c, h }).map((v) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0')).join('');
}

function composite(foreground, background, alpha) {
  const fg = pcParse(foreground);
  const bg = pcParse(background);
  const a = clamp(alpha == null ? fg.a : alpha, 0, 1);
  return rgbToHex([fg.r * a + bg.r * (1 - a), fg.g * a + bg.g * (1 - a), fg.b * a + bg.b * (1 - a)]);
}

function contrastRatio(a, b) {
  let bg = pcParse(b);
  if (bg.a < 1) bg = pcParse(composite(bg, '#808080', bg.a));
  const raw = pcParse(a);
  const fg = raw.a < 1 ? pcParse(composite(raw, rgbToHex(bg), raw.a)) : raw;
  const la = luminance(fg);
  const lb = luminance(bg);
  const hi = la >= lb ? la : lb;
  const lo = la >= lb ? lb : la;
  return (hi + 0.05) / (lo + 0.05);
}

function mixOklch(a, b, t) {
  const A = srgbToOklch(a);
  const B = srgbToOklch(b);
  const s = clamp(Number(t), 0, 1);
  const hueA = A.c < 0.0005 ? B.h : A.h;
  const hueB = B.c < 0.0005 ? A.h : B.h;
  return oklchToSrgb({ l: A.l + (B.l - A.l) * s, c: A.c + (B.c - A.c) * s, h: hueA + (((hueB - hueA + 540) % 360) - 180) * s });
}

/* ------------------------------------------------------------------ */
/* ramp grammars and gates                                             */
/* ------------------------------------------------------------------ */

const pcNormalDark = {
  dark: true, comfort: false, cap: 0.45, liftL: 0.9, inkL: 0.04, baseBand: [0.1, 0.235],
  surfaceSteps: [0.18, 0.34, 0.485], sidebarStep: 0.15, overlayStep: 0.83, codeStep: 0.12, inlineStep: 0.29,
  labelL: [0.89, 0.735, 0.625, 0.535, 0.4], borderAlphas: [0.08, 0.13, 0.18, 0.23], maskAlphas: [0.24, 0.12, 0.48, 0.88],
  brandLum: 0.19, brandMin: 0.06, chroma: { text: 0.03, base: 0.06, brand: 0.2, support: 0.13 }, stateScale: 1,
};
const pcNormalLight = {
  dark: false, comfort: false, cap: 1, liftL: 0.985, inkL: 0.18, baseBand: [0.92, 0.975],
  surfaceSteps: [0.28, 0.46, 0.6], sidebarStep: -0.28, overlayStep: 0.78, codeStep: 0.045, inlineStep: 0.045,
  labelL: [0.24, 0.45, 0.54, 0.61, 0.745], borderAlphas: [0.09, 0.15, 0.2, 0.26], maskAlphas: [0.24, 0.12, 0.48, 0.88],
  brandLum: 0.19, brandMin: 0.06, chroma: { text: 0.035, base: 0.045, brand: 0.18, support: 0.12 }, stateScale: 1,
};
const pcComfortDark = Object.assign({}, pcNormalDark, {
  comfort: true, liftL: 0.78, baseBand: [0.245, 0.28], surfaceSteps: [0.162, 0.277, 0.393], sidebarStep: 0.162, overlayStep: 0.671,
  labelL: null, labelContrast: [9.5, 6, 4.5, 3.2, 1.9], borderAlphas: [0.1, 0.14, 0.18, 0.22], maskAlphas: [0.2, 0.1, 0.4, 0.8],
  brandLum: 0.185, brandMin: 0.05, chroma: { text: 0.02, base: 0.03, brand: 0.1, support: 0.06 }, stateScale: 0.85,
});
const pcComfortLight = Object.assign({}, pcNormalLight, {
  comfort: true, baseBand: [0.92, 0.965], labelL: null, labelContrast: [10.5, 6.5, 4.8, 3.4, 1.9],
  brandLum: 0.185, brandMin: 0.05, chroma: { text: 0.02, base: 0.03, brand: 0.1, support: 0.06 }, stateScale: 0.85,
});

/** The two ramp grammars, selectable through recipe.ramps. */
const RAMP_SETS = { normal: { dark: pcNormalDark, light: pcNormalLight }, comfort: { dark: pcComfortDark, light: pcComfortLight } };

/** Contrast gates as [minimum, maximum] pairs. Never edit a gate to pass a case. */
const GATES = {
  normal: { labelPrimaryOnBase: [7, null], labelSecondaryOnBase: [4.5, null], brandOnBase: [3, null], labelOnBrand: [3, null], stateOnBase: [3, null] },
  comfort: { labelPrimaryOnBase: [4.5, 12], labelSecondaryOnBase: [4.5, null], brandOnBase: [3, null], labelOnBrand: [3, null], stateOnBase: [3, null], noPure: true },
};

/* ------------------------------------------------------------------ */
/* palette derivation                                                  */
/* ------------------------------------------------------------------ */

const pcStateNames = ['error', 'success', 'warn', 'idle'];

function pcContrastToL(base, target, dark, c, h) {
  let lo = 0.02;
  let hi = 0.985;
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    const pass = contrastRatio(pcOklch(mid, c, h), base) >= target;
    if (dark ? pass : !pass) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

function pcLumToL(target, c, h) {
  let lo = 0.02;
  let hi = 0.985;
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    if (luminance(pcOklch(mid, c, h)) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function pcOnBrand(brand, dark) {
  const h = srgbToOklch(brand).h;
  const light = pcOklch(0.965, 0.012, h);
  const deep = pcOklch(0.13, 0.012, h);
  return contrastRatio(light, brand) >= contrastRatio(deep, brand) ? light : deep;
}

const pcStateColor = (anchor, ramp) => {
  const o = srgbToOklch(anchor);
  return pcOklch(o.l, clamp(o.c * ramp.stateScale, 0.02, 0.22), o.h);
};

function pcCore(recipe) {
  if (!recipe || typeof recipe !== 'object') throw new Error('palette-core: recipe must be an object');
  if (recipe.scheme !== 'light' && recipe.scheme !== 'dark') throw new Error('palette-core: recipe.scheme must be "light" or "dark"');
  if (!recipe.states || typeof recipe.states !== 'object') throw new Error('palette-core: recipe.states is required');
  if (!Array.isArray(recipe.supporting) || recipe.supporting.length < 2) throw new Error('palette-core: recipe.supporting must be two colors');
  const dark = recipe.scheme === 'dark';
  const ramp = Object.assign({}, RAMP_SETS.normal[recipe.scheme], recipe.ramps || {});
  const bi = srgbToOklch(recipe.base);
  const ai = srgbToOklch(recipe.accent);
  const tint = Number.isFinite(recipe.tintHue) ? ((recipe.tintHue % 360) + 360) % 360 : bi.h;
  const baseC = Math.min(bi.c, ramp.chroma.base);
  const base = pcOklch(clamp(bi.l, ramp.baseBand[0], ramp.baseBand[1]), baseC, tint);
  const L = srgbToOklch(base).l;
  const textC = Math.min(ramp.chroma.text, 0.006 + baseC * 0.25);
  const surfC = Math.min(ramp.chroma.base, 0.006 + baseC * 0.7);
  const textTint = tint;
  const labelL = ramp.labelL || ramp.labelContrast.map((t) => pcContrastToL(base, t, dark, textC, textTint));
  const texts = labelL.map((l) => pcOklch(l, textC, textTint));
  const accentC = clamp(ai.c, ramp.brandMin, ramp.chroma.brand);
  const accentHue = ai.c > 0.01 ? ai.h : tint;
  const labelLum = luminance(texts[0]);
  const low = dark ? 3 * (luminance(base) + 0.05) - 0.05 : 3 * (labelLum + 0.05) - 0.05;
  const high = dark ? (labelLum + 0.05) / 3 - 0.05 : (luminance(base) + 0.05) / 3 - 0.05;
  const target = high - low >= 0.02 ? clamp(ramp.brandLum, low + 0.008, high - 0.008) : (low + high) / 2;
  const liftAt = (t) => L + (ramp.cap - L) * t;
  return {
    dark, ramp, base, L, tint, textC, surfC, lift: pcOklch(ramp.liftL, Math.min(0.03, 0.008 + baseC * 0.2), tint), ink: pcOklch(ramp.inkL, Math.min(0.02, textC), tint),
    l1: pcOklch(liftAt(ramp.surfaceSteps[0]), surfC, tint), l2: pcOklch(liftAt(ramp.surfaceSteps[1]), surfC, tint), l3: pcOklch(liftAt(ramp.surfaceSteps[2]), surfC, tint),
    ov: pcOklch(liftAt(ramp.overlayStep), surfC, tint), sbf: pcOklch(liftAt(ramp.sidebarStep), surfC, tint),
    tp: texts[0], ts: texts[1], tt: texts[2], tc: texts[3], td: texts[4], br: pcOklch(pcLumToL(clamp(target, 0.03, 0.9), accentC, accentHue), accentC, accentHue),
    er: pcStateColor(recipe.states.error, ramp), su: pcStateColor(recipe.states.success, ramp), wa: pcStateColor(recipe.states.warn, ramp), id: pcStateColor(recipe.states.idle, ramp),
    supporting: recipe.supporting.slice(0, 2).map((color, index) => {
      const o = srgbToOklch(color);
      return { h: o.c > 0.005 ? o.h : (tint + 45 * (index + 1)) % 360, c: clamp(Math.max(o.c, 0.04), 0.04, ramp.chroma.support) };
    }),
    alphaSurfaces: recipe.alphaSurfaces === true,
  };
}

function pcDerive(p) {
  const { dark, ramp, base: b, tint, surfC } = p;
  const L = p.L;
  const liftAt = (t) => L + (ramp.cap - L) * t;
  const inkAt = (t) => L + (ramp.inkL - L) * t;
  const tone = (t) => pcOklch(dark ? liftAt(t[0]) : inkAt(t[1]), surfC, tint);
  const lift5 = pcOklch(liftAt(0.55), surfC, tint);
  const soft = dark ? b : lift5;
  const glass = p.alphaSurfaces;
  const br = p.br;
  const brO = srgbToOklch(br);
  const bb = dark ? pcShiftL(br, 0.28, 0.92) : pcShiftL(br, 0.075, 0.82);
  const bt = dark ? pcOklch(clamp(brO.l + 0.27, 0.8, 0.9), brO.c * 0.7, brO.h) : pcOklch(brO.l - 0.09, brO.c * 0.85, brO.h);
  const s0 = p.supporting[0];
  const s1 = p.supporting[1];
  const maskInk = dark ? pcOklch(L * 0.28, surfC, tint) : pcOklch(inkAt(0.85), 0.02, tint);
  const tool = dark ? pcOklch(liftAt(0.3), surfC, tint) : pcOklch(inkAt(0.3), surfC, tint);
  const alphas = ramp.borderAlphas;

  /* tone pairs: [dark lift position, light ink position] */
  const T = {
    dp: [0, 0], mu: [0.045, 0.02], gh: [0.26, 0.12], gb: [0.5, 0.5], cb: [0.085, 0.035], cod: [ramp.codeStep, ramp.codeStep],
    tag: [0.11, 0.06], s1: [0.2, 0.16], s2: [0.3, 0.24], sh1: [0.34, 0.2], sh2: [0.44, 0.28], lin: [0.035, 0.055], ci: [0, 0.05],
  };
  for (const k in T) p[k] = k === 'dp' && dark ? b : k === 'ci' && dark ? p.l2 : tone(T[k]);
  p.tpd = dark ? mixOklch(p.tp, b, 0.12) : mixOklch(p.tp, p.lift, 0.1);
  p.oi = dark ? pcOklch(liftAt(0.14), surfC, tint) : p.lift;
  p.bri = p.tp;
  p.bh = pcShiftL(br, 0.06);
  p.bt = bt;
  p.bd = dark ? mixOklch(br, b, 0.42) : mixOklch(b, br, 0.22);
  p.ob = pcOnBrand(br, dark);
  p.if = pcOklch(dark ? 0.52 : 0.5, s0.c, s0.h);
  p.ac = pcOklch(dark ? 0.72 : 0.52, s0.c, s0.h);
  p.ih = dark ? mixOklch(p.if, p.lift, 0.2) : mixOklch(p.if, p.ink, 0.12);
  p.bs = pcOklch(dark ? 0.66 : 0.47, s1.c, s1.h);
  p.bss = pcRgba(p.bs, 0.14);
  p.dd = pcOklch(dark ? 0.78 : 0.48, s1.c, s1.h);
  p.dds = pcRgba(p.dd, 0.35);
  p.bl = dark ? p.tp : pcOklch(0.42, Math.min(0.12, s0.c), s0.h);
  p.lk = dark ? bt : p.if;
  p.sl = pcRgba(bb, 0.4);
  /* masks, borders, glass: alpha steps of one tint */
  p.m1 = pcRgba(maskInk, ramp.maskAlphas[0]);
  p.m2 = pcRgba(maskInk, ramp.maskAlphas[1]);
  p.m3 = pcRgba(maskInk, ramp.maskAlphas[2]);
  p.mp = pcRgba(maskInk, ramp.maskAlphas[3]);
  p.md = dark ? pcRgba(pcOklch(liftAt(0.28), surfC, tint), 0.7) : pcRgba(pcOklch(liftAt(0.92), surfC, tint), 0.72);
  p.sk = dark ? pcRgba(p.lift, 0.06) : pcRgba(p.ink, 0.05);
  p.cf = dark ? pcOklch(0.88, p.textC, tint) : pcOklch(0.235, 0.015, tint);
  p.ti = pcRgba(tool, glass ? 0.28 : 0.36);
  p.tf = pcRgba(tool, glass ? 0.4 : 0.5);
  p.th = pcRgba(tool, glass ? 0.5 : 0.6);
  p.ia = pcRgba(br, dark ? 0.16 : 0.14);
  p.iac = pcRgba(br, dark ? 0.22 : 0.18);
  p.iad = pcRgba(p.er, dark ? 0.12 : 0.1);
  p.ihv = dark ? pcRgba(p.lift, 0.07) : pcRgba(p.ink, 0.05);
  p.ic = dark ? pcOklch(liftAt(ramp.inlineStep), surfC, tint) : p.cod;
  p.csel = dark ? pcOklch(liftAt(0.19), surfC, tint) : pcOklch(liftAt(0.85), surfC, tint);
  p.sw = dark ? pcOklch(0.82, 0.02, tint) : pcOklch(0.97, 0.012, tint);
  p.tbg = dark ? pcOklch(liftAt(0.34), surfC, tint) : pcOklch(0.24, 0.015, tint);
  p.tbl = dark ? pcOklch(0.94, p.textC, tint) : pcOklch(0.955, 0.01, tint);
  p.tip = dark ? pcOklch(liftAt(0.36), surfC, tint) : pcOklch(0.24, 0.015, tint);
  p.tipk = mixOklch(p.tip, '#ffffff', 0.18);
  p.tr = dark ? pcRgba(p.lift, 0.07) : pcOklch(liftAt(0.4), surfC, tint);
  p.trh = dark ? pcRgba(p.lift, 0.11) : pcOklch(inkAt(0.05), surfC, tint);
  p.bu = dark ? mixOklch(p.l2, br, 0.06) : lift5;
  p.buh = dark ? mixOklch(p.l3, br, 0.1) : mixOklch(lift5, br, 0.16);
  p.inm = dark ? p.l2 : p.lift;
  const menuSurface = pcOklch(liftAt(dark ? 0.22 : 0.75), surfC, tint);
  const menuGroup = pcOklch(liftAt(dark ? 0.26 : 0.8), surfC, tint);
  p.msf = pcRgba(menuSurface, glass ? (dark ? 0.4 : 0.52) : dark ? 0.46 : 0.58);
  p.mgf = pcRgba(menuGroup, 0.94);
  p.mi = mixOklch(p.tp, p.ts, 0.55);
  p.sact = dark ? p.l3 : mixOklch(lift5, br, 0.06);
  p.sba = dark ? mixOklch(p.l2, br, 0.16) : mixOklch(b, br, 0.14);
  p.sbh = dark ? p.l2 : pcOklch(inkAt(0.05), surfC, tint);
  p.scf = p.l2;
  p.oa = pcOklch(dark ? 0.75 : 0.5, brO.c, brO.h);
  p.oc = dark ? pcRgba(pcOklch(liftAt(0.28), surfC, tint), glass ? 0.7 : 0.8) : pcRgba(pcOklch(liftAt(0.95), surfC, tint), glass ? 0.72 : 0.82);
  p.os = pcOklch(liftAt(dark ? 0.24 : 0.92), surfC, tint);
  p.ckb = dark ? pcRgba(p.lift, alphas[1]) : pcRgba(p.ink, 0.22);
  const borderTint = dark ? p.lift : p.ink;
  p.b1 = pcRgba(borderTint, alphas[0]);
  p.b2 = pcRgba(borderTint, alphas[1]);
  p.b3 = pcRgba(borderTint, alphas[2]);
  p.b4 = pcRgba(borderTint, alphas[3]);
  p.btn = dark ? p.b1 : pcRgba(p.ink, Math.max(0.06, alphas[1] - 0.04));
  p.bi = dark ? pcRgba(p.lift, 0.06) : pcRgba(p.ink, 0);
  p.bi2 = dark ? pcRgba(p.lift, 0.08) : pcRgba(p.ink, 0);
  p.ls = pcRgba(p.tp, dark ? 0.32 : 0.28);
  /* states, soft fills and diff surfaces */
  p.erb = dark ? pcShiftL(p.er, 0.09) : pcShiftL(p.er, 0.07);
  p.sub = dark ? pcShiftL(p.su, 0.09) : pcShiftL(p.su, 0.07);
  p.sus = dark ? mixOklch(b, p.su, 0.12) : mixOklch(soft, p.su, 0.12);
  p.wab = dark ? pcShiftL(p.wa, 0.09) : pcShiftL(p.wa, 0.07);
  p.wat = dark ? pcShiftL(p.wa, 0.06) : pcShiftL(p.wa, -0.1);
  p.was = dark ? mixOklch(b, p.wa, 0.12) : mixOklch(soft, p.wa, 0.12);
  const erD = dark ? pcShiftL(p.er, -0.17) : pcShiftL(p.er, -0.13);
  const suD = dark ? pcShiftL(p.su, -0.17) : pcShiftL(p.su, -0.13);
  p.dai = pcRgba(dark ? p.su : suD, 0.1);
  p.ddi = pcRgba(dark ? p.er : erD, 0.1);
  p.dab = dark ? mixOklch(b, p.su, 0.16) : mixOklch(soft, p.su, 0.14);
  p.ddb = dark ? mixOklch(b, p.er, 0.16) : mixOklch(soft, p.er, 0.14);
  p.dag = dark ? mixOklch(p.dab, b, 0.45) : mixOklch(p.dab, p.lift, 0.55);
  p.ddg = dark ? mixOklch(p.ddb, b, 0.45) : mixOklch(p.ddb, p.lift, 0.55);
  p.dam = dark ? p.sub : suD;
  p.ddm = dark ? p.erb : erD;
  return p;
}

/** Build the complete 119 token map for one scheme from a compact recipe. */
function buildTokensFromRecipe(recipe) {
  const palette = pcDerive(pcCore(recipe));
  const tokens = {};
  for (const row of pcRoles) {
    const value = palette[row[1]];
    if (typeof value !== 'string') throw new Error('palette-core: missing derived color for token ' + row[0]);
    tokens[row[0]] = value;
  }
  return tokens;
}

/* ------------------------------------------------------------------ */
/* contrast assessment                                                 */
/* ------------------------------------------------------------------ */

const pcGatePair = (gates, key) => {
  const g = gates && gates[key];
  if (g == null) return [0, null];
  return typeof g === 'number' ? [g, null] : [g[0], g[1] == null ? null : g[1]];
};
const pcGateFail = (v, g) => v < g[0] - 1e-9 || (g[1] != null && v > g[1] + 1e-9);

function pcIsPure(value) {
  if (pcParse(value).a < 1) return false;
  const lum = luminance(value);
  return lum >= 1 - 1e-6 || lum <= 1e-6;
}

function pcMeasure(tokens, gates) {
  const b = tokens['--dsw-alias-bg-base'];
  const br = tokens['--dsw-alias-brand-primary'];
  const tp = tokens['--dsw-alias-label-primary'];
  const values = {
    labelPrimaryOnBase: contrastRatio(tp, b),
    labelSecondaryOnBase: contrastRatio(tokens['--dsw-alias-label-secondary'], b),
    brandOnBase: contrastRatio(br, b),
    labelOnBrand: contrastRatio(tp, br),
    labelOnBrandForeground: contrastRatio(tokens['--dsw-alias-label-primary-foreground'], br),
  };
  const statesOnBase = {};
  for (const name of pcStateNames) statesOnBase[name] = contrastRatio(tokens['--dsw-alias-state-' + name + '-primary'], b);
  values.stateOnBase = Math.min(statesOnBase.error, statesOnBase.success, statesOnBase.warn, statesOnBase.idle);
  const failures = [];
  const push = (gate, token, value, extra) => {
    const pair = pcGatePair(gates, gate);
    if (pcGateFail(value, pair)) failures.push(Object.assign({ gate, token, value, min: pair[0], max: pair[1] }, extra || {}));
  };
  push('labelPrimaryOnBase', '--dsw-alias-label-primary', values.labelPrimaryOnBase);
  push('labelSecondaryOnBase', '--dsw-alias-label-secondary', values.labelSecondaryOnBase);
  push('brandOnBase', '--dsw-alias-brand-primary', values.brandOnBase);
  push('labelOnBrand', '--dsw-alias-label-primary', values.labelOnBrand);
  push('labelOnBrandForeground', '--dsw-alias-label-primary-foreground', values.labelOnBrandForeground);
  for (const name of pcStateNames) push('stateOnBase', '--dsw-alias-state-' + name + '-primary', statesOnBase[name], { state: name });
  if (gates && gates.noPure) {
    for (const row of pcRoles) if (pcIsPure(tokens[row[0]])) failures.push({ gate: 'noPure', token: row[0], value: 0, min: 0, max: null });
  }
  return { values, statesOnBase, failures };
}

/** Measure every gate from a token map. Gate definitions are read only. */
function assessContrast(tokens, scheme, gates) {
  if (!tokens || typeof tokens !== 'object') throw new Error('palette-core: assessContrast needs a token map');
  const m = pcMeasure(tokens, gates || GATES.normal);
  const statesOnBase = {};
  for (const name of pcStateNames) statesOnBase[name] = pcR2(m.statesOnBase[name]);
  return {
    labelPrimaryOnBase: pcR2(m.values.labelPrimaryOnBase),
    labelSecondaryOnBase: pcR2(m.values.labelSecondaryOnBase),
    brandOnBase: pcR2(m.values.brandOnBase),
    labelOnBrand: pcR2(m.values.labelOnBrand),
    labelOnBrandForeground: pcR2(m.values.labelOnBrandForeground),
    statesOnBase,
    stateOnBase: pcR2(m.values.stateOnBase),
    failures: m.failures.map((f) => {
      const row = { gate: f.gate };
      if (f.state) row.state = f.state;
      row.value = pcR2(f.value);
      row.min = f.min;
      row.max = f.max;
      return row;
    }),
  };
}

/* ------------------------------------------------------------------ */
/* repair loop                                                         */
/* ------------------------------------------------------------------ */

/** Named error thrown when contrast repair cannot converge. */
class pcRepairError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PaletteRepairError';
  }
}

const pcGated = [
  '--dsw-alias-label-primary', '--dsw-alias-label-secondary', '--dsw-alias-brand-primary', '--dsw-alias-label-primary-foreground',
  '--dsw-alias-state-error-primary', '--dsw-alias-state-success-primary', '--dsw-alias-state-warn-primary', '--dsw-alias-state-idle-primary',
];

function pcSig(tokens) {
  return pcGated.map((n) => {
    const o = srgbToOklch(tokens[n]);
    return o.l.toFixed(4) + '/' + o.c.toFixed(4) + '/' + o.h.toFixed(1);
  }).join(',');
}

function pcFailureText(failures) {
  return failures.map((f) => f.gate + (f.state ? ':' + f.state : '') + '=' + Number(f.value).toFixed(2)).join(' | ');
}

function pcAdjustL(tokens, name, delta, lo, hi, adjustments) {
  const o = srgbToOklch(tokens[name]);
  const next = clamp(o.l + delta, lo, hi);
  if (Math.abs(next - o.l) < 1e-9) return;
  const from = tokens[name];
  tokens[name] = pcOklch(next, o.c, o.h);
  adjustments.push({ token: name, from, to: tokens[name] });
}

/**
 * Walk lightness in small steps until every gate passes. Gates are read only.
 * Throws PaletteRepairError when the gate set cannot be met by the token map.
 */
function repairContrast(tokens, scheme, gates) {
  if (!tokens || typeof tokens !== 'object') throw new Error('palette-core: repairContrast needs a token map');
  const dark = scheme !== 'light';
  const gateSet = gates || GATES.normal;
  const out = {};
  for (const name of roleTokenNames()) {
    if (typeof tokens[name] !== 'string') throw new Error('palette-core: repairContrast token map is missing ' + name);
    out[name] = tokens[name];
  }
  const adjustments = [];
  const seen = new Set();
  let last = [];
  for (let iteration = 0; iteration < 420; iteration += 1) {
    const measured = pcMeasure(out, gateSet);
    if (measured.failures.length === 0) {
      pcRefreshGated(out, dark);
      return { tokens: out, adjustments };
    }
    last = measured.failures;
    const signature = pcFailureText(measured.failures) + '#' + pcSig(out);
    if (seen.has(signature)) throw new pcRepairError('palette-core: contrast repair stalled with ' + pcFailureText(measured.failures));
    seen.add(signature);
    const touched = {};
    for (const f of measured.failures) {
      const name = f.token;
      if (f.gate === 'noPure') {
        if (!touched[name]) {
          touched[name] = true;
          pcAdjustL(out, name, luminance(out[name]) >= 1 - 1e-6 ? -0.02 : 0.02, 0.02, 0.985, adjustments);
        }
        continue;
      }
      if (f.gate === 'labelOnBrandForeground') {
        out[name] = pcOnBrand(out['--dsw-alias-brand-primary'], dark);
        continue;
      }
      if (f.gate === 'labelOnBrand') {
        const label = '--dsw-alias-label-primary';
        const labelL = srgbToOklch(out[label]).l;
        if ((dark ? labelL < 0.979 : labelL > 0.026) && !touched[label]) {
          touched[label] = true;
          pcAdjustL(out, label, dark ? 0.01 : -0.01, 0.02, 0.985, adjustments);
        } else if (!touched['--dsw-alias-brand-primary']) {
          touched['--dsw-alias-brand-primary'] = true;
          pcAdjustL(out, '--dsw-alias-brand-primary', dark ? -0.01 : 0.01, 0.25, 0.8, adjustments);
        }
        continue;
      }
      if (touched[name]) continue;
      touched[name] = true;
      const brandGate = f.gate === 'brandOnBase';
      const maxFailure = f.max != null && f.value > f.max + 1e-9;
      const delta = brandGate ? (dark ? 0.01 : -0.01) : maxFailure ? (dark ? -0.01 : 0.01) : dark ? 0.01 : -0.01;
      const lo = brandGate || f.gate === 'stateOnBase' ? 0.25 : 0.02;
      const hi = brandGate ? 0.8 : f.gate === 'stateOnBase' ? 0.9 : 0.985;
      pcAdjustL(out, name, delta, lo, hi, adjustments);
    }
  }
  throw new pcRepairError('palette-core: contrast repair exceeded 420 iterations with ' + pcFailureText(last));
}

/* Recompute tokens that depend on the gated text, brand and state colors. */
function pcRefreshGated(t, dark) {
  const b = t['--dsw-alias-bg-base'];
  const l2 = t['--dsw-alias-bg-layer-2'];
  const l3 = t['--dsw-alias-bg-layer-3'];
  const liftProxy = dark ? t['--dsw-alias-label-primary'] : l3;
  const soft = dark ? b : l2;
  const tp = t['--dsw-alias-label-primary'];
  const br = t['--dsw-alias-brand-primary'];
  const brO = srgbToOklch(br);
  const er = t['--dsw-alias-state-error-primary'];
  const su = t['--dsw-alias-state-success-primary'];
  const wa = t['--dsw-alias-state-warn-primary'];
  t['--dsw-alias-label-primary-dimmed'] = dark ? mixOklch(tp, b, 0.12) : mixOklch(tp, liftProxy, 0.1);
  t['--dsw-alias-brand-primary-invert'] = tp;
  const bt = dark ? pcOklch(clamp(brO.l + 0.27, 0.8, 0.9), brO.c * 0.7, brO.h) : pcOklch(brO.l - 0.09, brO.c * 0.85, brO.h);
  t['--dsw-alias-brand-text'] = bt;
  const bh = pcShiftL(br, 0.06);
  const bb = dark ? pcShiftL(br, 0.28, 0.92) : pcShiftL(br, 0.075, 0.82);
  t['--dsw-alias-button-primary-fill'] = br;
  t['--dsw-alias-button-primary-hover'] = bh;
  t['--dsw-alias-button-primary-dimmed'] = dark ? mixOklch(br, b, 0.42) : mixOklch(b, br, 0.22);
  t['--dsw-alias-bg-document-selection'] = pcRgba(bb, 0.4);
  t['--dsw-alias-interactive-bg-active'] = pcRgba(br, dark ? 0.16 : 0.14);
  t['--dsw-alias-interactive-bg-hover-accent'] = pcRgba(br, dark ? 0.22 : 0.18);
  t['--dsw-alias-interactive-bg-hover-danger'] = pcRgba(er, dark ? 0.12 : 0.1);
  t['--dsw-specific-sidebar-nav-item-active-accent'] = dark ? mixOklch(l2, br, 0.16) : mixOklch(b, br, 0.14);
  const lift5 = mixOklch(l2, l3, 0.67);
  t['--dsw-specific-sidebar-nav-item-active'] = dark ? l3 : mixOklch(lift5, br, 0.06);
  t['--dsw-specific-bubble'] = dark ? mixOklch(l2, br, 0.06) : lift5;
  t['--dsw-specific-bubble-highlight'] = dark ? mixOklch(l3, br, 0.1) : mixOklch(lift5, br, 0.16);
  t['--dsw-alias-menu-icon'] = mixOklch(tp, t['--dsw-alias-label-secondary'], 0.55);
  t['--dsw-alias-label-shimmer'] = pcRgba(tp, dark ? 0.32 : 0.28);
  t['--dsw-alias-label-primary-foreground'] = pcOnBrand(br, dark);
  if (dark) t['--dsw-alias-link'] = bt;
  const erB = dark ? pcShiftL(er, 0.09) : pcShiftL(er, 0.07);
  const suB = dark ? pcShiftL(su, 0.09) : pcShiftL(su, 0.07);
  const waB = dark ? pcShiftL(wa, 0.09) : pcShiftL(wa, 0.07);
  const erD = dark ? pcShiftL(er, -0.17) : pcShiftL(er, -0.13);
  const suD = dark ? pcShiftL(su, -0.17) : pcShiftL(su, -0.13);
  t['--dsw-alias-state-error-secondary'] = erB;
  t['--dsw-alias-state-success-secondary'] = suB;
  t['--dsw-alias-state-warn-secondary'] = waB;
  t['--dsw-alias-state-warn-label'] = dark ? pcShiftL(wa, 0.06) : pcShiftL(wa, -0.1);
  t['--dsw-alias-state-success-tertiary'] = dark ? mixOklch(b, su, 0.12) : mixOklch(soft, su, 0.12);
  t['--dsw-alias-state-warn-tertiary'] = dark ? mixOklch(b, wa, 0.12) : mixOklch(soft, wa, 0.12);
  t['--dsw-alias-code-diff-added'] = pcRgba(dark ? su : suD, 0.1);
  t['--dsw-alias-code-diff-deleted'] = pcRgba(dark ? er : erD, 0.1);
  const dab = dark ? mixOklch(b, su, 0.16) : mixOklch(soft, su, 0.14);
  const ddb = dark ? mixOklch(b, er, 0.16) : mixOklch(soft, er, 0.14);
  t['--dsw-alias-file-diff-added-bg'] = dab;
  t['--dsw-alias-file-diff-deleted-bg'] = ddb;
  t['--dsw-alias-file-diff-added-gutter'] = dark ? mixOklch(dab, b, 0.45) : mixOklch(dab, liftProxy, 0.55);
  t['--dsw-alias-file-diff-deleted-gutter'] = dark ? mixOklch(ddb, b, 0.45) : mixOklch(ddb, liftProxy, 0.55);
  t['--dsw-alias-file-diff-added-marker'] = dark ? suB : suD;
  t['--dsw-alias-file-diff-deleted-marker'] = dark ? erB : erD;
}

      // pixel-theme.mjs
// Pixel analysis and wallpaper theme assembly for H4X0R Themes v2.
// Imports the palette-core helpers it uses. The client build removes this one
// import line and inlines both files into one scope, palette-core first, so the
// browser bundle never sees a module import. Deterministic: no clock, no
// randomness, no locale sensitive formatting.

const PX_SIDE = 96;
const PX_K = 6;
const PX_ITERS = 20;
const PX_LIGHT_LUMA = 0.5;
const PX_MONOTONE = 0.05;
const PX_SCRIM = '#808080';
const PX_HUES = 'Rose Amber Citron Fern Jade Aqua Cyan Azure Cobalt Iris Orchid Plum'.split(' ');
const PX_SURF = ['--dsw-alias-bg-base', '--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2', '--dsw-alias-bg-module-platform', '--dsw-specific-sidebar-fill'];
const PX_ALPHA = {
  normal: { dark: [0.9, 0.92, 0.93, 0.94, 0.91], light: [0.84, 0.88, 0.9, 0.91, 0.87] },
  comfort: { dark: [0.93, 0.94, 0.95, 0.955, 0.935], light: [0.88, 0.9, 0.92, 0.93, 0.9] },
};

function pxError(message) {
  const error = new Error('pixel-theme: ' + message);
  error.name = 'PixelImageError';
  return error;
}

const pxRound = (v, d) => Math.round(Number(v) * Math.pow(10, d)) / Math.pow(10, d);

function pxHueDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function pxHueName(hue) {
  return PX_HUES[Math.floor((((hue % 360) + 360) % 360) / 30) % PX_HUES.length];
}

function pxValidate(rgba, width, height) {
  if (!rgba || typeof rgba.length !== 'number') throw pxError('rgba must be a byte array');
  if (!(width > 0) || !(height > 0) || width !== Math.floor(width) || height !== Math.floor(height)) throw pxError('width and height must be positive integers');
  if (rgba.length < width * height * 4) throw pxError('rgba is shorter than width * height * 4 bytes');
}

/* Box sample to at most PX_SIDE per side, keeping a deterministic pixel order. */
function pxSample(rgba, width, height) {
  const stride = Math.max(1, Math.ceil(Math.max(width, height) / PX_SIDE));
  const points = [];
  let lumaSum = 0;
  for (let top = 0; top < height; top += stride) {
    const bottom = Math.min(height, top + stride);
    for (let left = 0; left < width; left += stride) {
      const right = Math.min(width, left + stride);
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let y = top; y < bottom; y += 1) {
        for (let x = left; x < right; x += 1) {
          const i = (y * width + x) * 4;
          if (rgba[i + 3] < 8) continue;
          r += rgba[i];
          g += rgba[i + 1];
          b += rgba[i + 2];
          n += 1;
        }
      }
      if (n === 0) continue;
      const pixel = [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
      const lum = luminance(pixel);
      const o = srgbToOklch(pixel);
      const rad = (o.h * Math.PI) / 180;
      points.push({ L: o.l, A: o.c * Math.cos(rad), B: o.c * Math.sin(rad), c: o.c, h: o.h, lum, w: 1 + 10 * Math.min(o.c, 0.3) });
      lumaSum += lum;
    }
  }
  if (points.length === 0) throw pxError('image has no opaque pixels');
  return { points, meanLuma: lumaSum / points.length };
}

function pxMeanHue(points) {
  let sin = 0;
  let cos = 0;
  for (const p of points) {
    const rad = (p.h * Math.PI) / 180;
    sin += Math.sin(rad) * p.c;
    cos += Math.cos(rad) * p.c;
  }
  if (Math.abs(sin) < 1e-9 && Math.abs(cos) < 1e-9) return 0;
  const hue = (Math.atan2(sin, cos) * 180) / Math.PI;
  return hue < 0 ? hue + 360 : hue;
}

const pxDist = (a, b) => (a.L - b.L) ** 2 + (a.A - b.A) ** 2 + (a.B - b.B) ** 2;

/* Deterministic seeds: most vivid, darkest, lightest, then farthest points. */
function pxSeeds(points) {
  const seeds = [];
  const pick = (score) => {
    let best = 0;
    let bestScore = -Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const value = score(points[i]);
      if (value > bestScore) {
        bestScore = value;
        best = i;
      }
    }
    seeds.push(points[best]);
  };
  pick((p) => p.c * 2 - p.L);
  pick((p) => -p.L);
  pick((p) => p.L);
  while (seeds.length < PX_K) {
    let bestIndex = 0;
    let bestDistance = -1;
    for (let i = 0; i < points.length; i += 1) {
      let nearest = Infinity;
      for (const seed of seeds) nearest = Math.min(nearest, pxDist(points[i], seed));
      if (nearest > bestDistance) {
        bestDistance = nearest;
        bestIndex = i;
      }
    }
    seeds.push(points[bestIndex]);
  }
  return seeds;
}

/* Weighted k-means in OKLab, chroma weighted so a small vivid region can win. */
function pxCluster(points) {
  let centers = pxSeeds(points).map((p) => ({ L: p.L, A: p.A, B: p.B }));
  const assignment = new Array(points.length).fill(0);
  for (let iteration = 0; iteration < PX_ITERS; iteration += 1) {
    const sums = centers.map(() => ({ L: 0, A: 0, B: 0, w: 0 }));
    let changed = false;
    for (let i = 0; i < points.length; i += 1) {
      let best = 0;
      let bestDistance = Infinity;
      for (let k = 0; k < centers.length; k += 1) {
        const d = pxDist(points[i], centers[k]);
        if (d < bestDistance) {
          bestDistance = d;
          best = k;
        }
      }
      if (assignment[i] !== best) {
        assignment[i] = best;
        changed = true;
      }
      const s = sums[best];
      s.L += points[i].L * points[i].w;
      s.A += points[i].A * points[i].w;
      s.B += points[i].B * points[i].w;
      s.w += points[i].w;
    }
    centers = centers.map((old, i) => (sums[i].w > 0 ? { L: sums[i].L / sums[i].w, A: sums[i].A / sums[i].w, B: sums[i].B / sums[i].w } : old));
    if (!changed && iteration > 0) break;
  }
  const masses = new Array(centers.length).fill(0);
  for (let i = 0; i < points.length; i += 1) masses[assignment[i]] += points[i].w;
  const total = masses.reduce((a, b) => a + b, 0);
  return centers.map((center, i) => {
    const c = Math.hypot(center.A, center.B);
    let h = (Math.atan2(center.B, center.A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return { l: center.L, c, h, mass: total > 0 ? masses[i] / total : 0, color: oklchToSrgb({ l: center.L, c, h }) };
  });
}

/** Analyze RGBA bytes into a compact palette description. Large input is box sampled. */
function analyzePixels(rgba, width, height, options) {
  const opts = options || {};
  pxValidate(rgba, width, height);
  if (opts.forceScheme != null && opts.forceScheme !== 'light' && opts.forceScheme !== 'dark') throw pxError('options.forceScheme must be "light" or "dark"');
  const sampled = pxSample(rgba, width, height);
  const points = sampled.points;
  const meanHue = pxMeanHue(points);
  const colorScheme = opts.forceScheme || (sampled.meanLuma >= PX_LIGHT_LUMA ? 'light' : 'dark');
  const clusters = pxCluster(points).sort((a, b) => (Math.abs(b.mass - a.mass) > 1e-12 ? b.mass - a.mass : Math.abs(b.c - a.c) > 1e-12 ? b.c - a.c : a.color < b.color ? -1 : a.color > b.color ? 1 : 0));
  const target = colorScheme === 'dark' ? 0.12 : 0.93;
  let baseIndex = 0;
  let baseScore = -Infinity;
  for (let i = 0; i < clusters.length; i += 1) {
    const score = clusters[i].mass * 2.4 - Math.abs(clusters[i].l - target) * 2.2 - Math.min(clusters[i].c, 0.4) * 1.2;
    if (score > baseScore) {
      baseScore = score;
      baseIndex = i;
    }
  }
  let accentIndex = 0;
  for (let i = 1; i < clusters.length; i += 1) {
    if (clusters[i].c > clusters[accentIndex].c + 1e-12 || (Math.abs(clusters[i].c - clusters[accentIndex].c) <= 1e-12 && clusters[i].mass > clusters[accentIndex].mass + 1e-12)) accentIndex = i;
  }
  const base = clusters[baseIndex];
  const accent = clusters[accentIndex];
  const monotone = Math.max.apply(null, clusters.map((c) => c.c)) < PX_MONOTONE;
  const baseHue = base.c > 0.008 ? base.h : meanHue;
  const accentHue = accent.c > 0.008 ? accent.h : meanHue;
  const tintHue = monotone ? meanHue : baseHue;
  const supporting = [];
  const candidates = clusters.filter((c, i) => i !== baseIndex && i !== accentIndex && c.c >= 0.015);
  const pickSupport = (hueA, hueB) => {
    let best = null;
    let bestScore = -Infinity;
    for (const c of candidates) {
      const score = pxHueDistance(c.h, hueA) + pxHueDistance(c.h, hueB) * 0.5 + c.mass * 90;
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    return best;
  };
  const first = pickSupport(accentHue, accentHue);
  const second = first ? pickSupport(accentHue, first.h) : null;
  for (const c of [first, second]) if (c) supporting.push(oklchToSrgb({ l: colorScheme === 'dark' ? 0.6 : 0.5, c: clamp(c.c, 0.03, 0.12), h: c.h }));
  for (let i = supporting.length; i < 2; i += 1) supporting.push(oklchToSrgb({ l: colorScheme === 'dark' ? 0.6 : 0.48, c: 0.05, h: (accentHue + 140 + 75 * i) % 360 }));
  return {
    colorScheme,
    meanLuma: pxRound(sampled.meanLuma, 6),
    baseColor: monotone ? oklchToSrgb({ l: base.l, c: Math.max(base.c, 0.014), h: meanHue }) : base.color,
    accentColor: monotone ? oklchToSrgb({ l: colorScheme === 'dark' ? 0.6 : 0.55, c: 0.06, h: meanHue }) : accent.color,
    supporting,
    monotone,
    clusters: clusters.map((c) => ({ color: c.color, weight: pxRound(c.mass, 6), chroma: pxRound(c.c, 4) })),
  };
}

function pxStates(dark, comfort, tintHue) {
  const s = comfort ? 0.85 : 1;
  return {
    error: oklchToSrgb({ l: dark ? 0.6 : 0.51, c: (dark ? 0.16 : 0.15) * s, h: 27 }),
    success: oklchToSrgb({ l: dark ? 0.65 : 0.54, c: (dark ? 0.125 : 0.1) * s, h: dark ? 152 : 150 }),
    warn: oklchToSrgb({ l: dark ? 0.68 : 0.6, c: (dark ? 0.12 : 0.115) * s, h: 78 }),
    idle: oklchToSrgb({ l: 0.58, c: 0.012, h: tintHue }),
  };
}

function pxAlphaSet(scheme, comfort) {
  const list = PX_ALPHA[comfort ? 'comfort' : 'normal'][scheme];
  const out = {};
  PX_SURF.forEach((name, i) => {
    out[name] = list[i];
  });
  return out;
}

function pxSurfaces(tokens, scheme, comfort) {
  const alphas = pxAlphaSet(scheme, comfort);
  const surfaces = {};
  for (const name of PX_SURF) {
    const rgb = hexToRgb(tokens[name]);
    surfaces[name] = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + Number(alphas[name].toFixed(3)) + ')';
  }
  return surfaces;
}

/** Worst case photo canvas: the alpha surface composited over a mid gray scrim. */
const pxEffectiveBase = (surfaces) => composite(surfaces['--dsw-alias-bg-base'], PX_SCRIM);

function pxSupporting(analysis, dark, ramp) {
  return [0, 1].map((i) => {
    const o = srgbToOklch(analysis.supporting[i]);
    const hue = o.c > 0.005 ? o.h : (srgbToOklch(analysis.accentColor).h + 140 * (i + 1)) % 360;
    return oklchToSrgb({ l: dark ? 0.6 : 0.5, c: clamp(Math.max(o.c, 0.03), 0.03, ramp.chroma.support), h: hue });
  });
}

/** Build a full 119 token wallpaper theme from RGBA bytes. */
function buildWallpaperTheme(rgba, width, height, options) {
  const opts = options || {};
  const analysis = analyzePixels(rgba, width, height, opts);
  const scheme = analysis.colorScheme;
  const dark = scheme === 'dark';
  const comfort = opts.comfort === true;
  const wallpaper = opts.wallpaper === true;
  const ramp = RAMP_SETS[comfort ? 'comfort' : 'normal'][scheme];
  const gates = comfort ? GATES.comfort : GATES.normal;
  const baseO = srgbToOklch(analysis.baseColor);
  const accentO = srgbToOklch(analysis.accentColor);
  const tintHue = baseO.c > 0.008 ? baseO.h : accentO.c > 0.008 ? accentO.h : 0;
  const accentHue = accentO.c > 0.008 ? accentO.h : tintHue;
  const recipe = {
    scheme,
    base: oklchToSrgb({ l: clamp(baseO.l, ramp.baseBand[0], ramp.baseBand[1]), c: Math.min(baseO.c, ramp.chroma.base), h: tintHue }),
    tintHue,
    accent: oklchToSrgb({ l: clamp(accentO.l, dark ? 0.48 : 0.44, dark ? 0.64 : 0.58), c: clamp(accentO.c, ramp.brandMin, ramp.chroma.brand), h: accentHue }),
    supporting: pxSupporting(analysis, dark, ramp),
    states: pxStates(dark, comfort, tintHue),
    ramps: ramp,
    alphaSurfaces: wallpaper,
  };
  const built = buildTokensFromRecipe(recipe);
  let tokens = built;
  let surfaces = {};
  let effectiveBase = built['--dsw-alias-bg-base'];
  if (wallpaper) {
    surfaces = pxSurfaces(built, scheme, comfort);
    effectiveBase = pxEffectiveBase(surfaces);
    const gateView = Object.assign({}, built);
    gateView['--dsw-alias-bg-base'] = effectiveBase;
    tokens = repairContrast(gateView, scheme, gates).tokens;
    tokens['--dsw-alias-bg-base'] = built['--dsw-alias-bg-base'];
  } else {
    tokens = repairContrast(built, scheme, gates).tokens;
  }
  const check = assessContrast(wallpaper ? Object.assign({}, tokens, { '--dsw-alias-bg-base': effectiveBase }) : tokens, scheme, gates);
  if (check.failures.length) throw pxError('generated palette failed the contrast gates: ' + JSON.stringify(check.failures));
  const meta = {
    fileName: typeof opts.fileName === 'string' ? opts.fileName : '',
    width,
    height,
    meanLuma: analysis.meanLuma,
    monotone: analysis.monotone,
    comfort,
    wallpaper,
    clusterCount: analysis.clusters.length,
    baseHue: pxRound(tintHue, 1),
    accentHue: pxRound(accentHue, 1),
    scrim: PX_SCRIM,
  };
  if (wallpaper) meta.surfaceAlphas = pxAlphaSet(scheme, comfort);
  return {
    name: 'Wallpaper · ' + pxHueName(tintHue),
    colorScheme: scheme,
    tokens,
    check,
    surfaces,
    monotone: analysis.monotone,
    meta,
  };
}

      var api = {};
      api.roleTokenNames = roleTokenNames;
      api.luminance = luminance;
      api.clamp = clamp;
      api.hexToRgb = hexToRgb;
      api.rgbToHex = rgbToHex;
      api.srgbToOklch = srgbToOklch;
      api.oklchToSrgb = oklchToSrgb;
      api.composite = composite;
      api.contrastRatio = contrastRatio;
      api.mixOklch = mixOklch;
      api.RAMP_SETS = RAMP_SETS;
      api.GATES = GATES;
      api.buildTokensFromRecipe = buildTokensFromRecipe;
      api.assessContrast = assessContrast;
      api.repairContrast = repairContrast;
      api.analyzePixels = analyzePixels;
      api.buildWallpaperTheme = buildWallpaperTheme;
      return api;
    })();

    const PACKS = THEME_DATA && Array.isArray(THEME_DATA.packs) ? THEME_DATA.packs : [];
    const CURATED = PACKS.reduce(function (all, pack) {
      return all.concat(Array.isArray(pack.themes) ? pack.themes : []);
    }, []);
    const THEME_IDS = CURATED.map(function (theme) {
      return theme.id;
    });

    const STORAGE_KEY = 'dsh.h4x0r.theme';
    const COMFORT_KEY = 'dsh.h4x0r.comfort';
    const DB_NAME = 'h4x0r-themes';
    const DB_STORE = 'wallpapers';
    const MAX_SAVED = 8;
    const BOOT_GRACE_MS = 4000;

    // ---------------------------------------------------------------- storage

    function readStored(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }

    function writeStored(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // Storage can be unavailable. The applied theme still stands.
      }
    }

    function removeStored(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        // Storage can be unavailable. Nothing to remove.
      }
    }

    function readSavedTheme() {
      return readStored(STORAGE_KEY);
    }

    function readComfort() {
      return readStored(COMFORT_KEY) === 'on';
    }

    function writeComfort(on) {
      if (on) writeStored(COMFORT_KEY, 'on');
      else removeStored(COMFORT_KEY);
    }

    // ------------------------------------------------------------- wallpaper DB

    function openDb() {
      return new Promise(function (resolve, reject) {
        if (!window.indexedDB) {
          reject(new Error('IndexedDB is unavailable in this browser.'));
          return;
        }
        const request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = function () {
          const db = request.result;
          if (!db.objectStoreNames.contains(DB_STORE)) {
            db.createObjectStore(DB_STORE, { keyPath: 'id' });
          }
        };
        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error || new Error('Cannot open the wallpaper store.'));
        };
      });
    }

    function dbRequest(mode, run) {
      return openDb().then(function (db) {
        return new Promise(function (resolve, reject) {
          const tx = db.transaction(DB_STORE, mode);
          const store = tx.objectStore(DB_STORE);
          let value;
          try {
            value = run(store);
          } catch (error) {
            reject(error);
            return;
          }
          tx.oncomplete = function () {
            resolve(value && value.result !== undefined ? value.result : value);
          };
          tx.onerror = function () {
            reject(tx.error || new Error('Wallpaper store failed.'));
          };
        });
      });
    }

    function dbPut(record) {
      return dbRequest('readwrite', function (store) {
        store.put(record);
      });
    }

    function dbGet(id) {
      return dbRequest('readonly', function (store) {
        return store.get(id);
      });
    }

    function dbDelete(id) {
      return dbRequest('readwrite', function (store) {
        store.delete(id);
      });
    }

    function dbAll() {
      return dbRequest('readonly', function (store) {
        return store.getAll();
      });
    }

    function trimSaved() {
      return dbAll().then(function (records) {
        const sorted = (records || []).sort(function (a, b) {
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
        const extra = sorted.slice(MAX_SAVED);
        return Promise.all(
          extra.map(function (record) {
            return dbDelete(record.id).catch(function () {});
          })
        );
      });
    }

    // ------------------------------------------------------------- theme runtime

    let runtime = null;
    let bootAt = 0;
    let reapplying = false;
    const wallDisposers = new Map();

    function createRuntime(ctx) {
      const listeners = new Set();
      let snapshot = ctx.theme.getTheme();
      return {
        ctx: ctx,
        getSnapshot: function () {
          return snapshot;
        },
        subscribe: function (listener) {
          listeners.add(listener);
          return function () {
            listeners.delete(listener);
          };
        },
        publish: function (next) {
          snapshot = next;
          listeners.forEach(function (listener) {
            listener();
          });
        },
        persist: function (id) {
          writeStored(STORAGE_KEY, id);
        },
      };
    }

    function isCuratedId(id) {
      return THEME_IDS.indexOf(id) !== -1;
    }

    function isWallId(id) {
      return typeof id === 'string' && id.indexOf('wall-') === 0;
    }

    function isKnownId(id) {
      return isCuratedId(id) || wallDisposers.has(id);
    }

    function schemeOf(theme) {
      return theme && theme.colorScheme === 'light' ? 'light' : 'dark';
    }

    function tokenColor(theme, shortName) {
      const tokens = theme && theme.tokens ? theme.tokens : {};
      const value = tokens['--dsw-alias-' + shortName];
      return typeof value === 'string' && value !== '' ? value : null;
    }

    function cardAccent(theme) {
      return (
        tokenColor(theme, 'brand-primary') ||
        tokenColor(theme, 'link') ||
        tokenColor(theme, 'state-business-primary') ||
        'var(--dsw-alias-brand-primary)'
      );
    }

    // ------------------------------------------------------------ wallpaper state

    let wallState = {
      status: 'idle',
      message: '',
      activeId: null,
      activeName: null,
      activeDataUrl: null,
      saved: [],
      comfort: false,
    };
    const wallListeners = new Set();

    function patchWall(patch) {
      wallState = Object.assign({}, wallState, patch);
      wallListeners.forEach(function (listener) {
        listener();
      });
    }

    function getWall() {
      return wallState;
    }

    function subscribeWall(listener) {
      wallListeners.add(listener);
      return function () {
        wallListeners.delete(listener);
      };
    }

    function setStatus(status, message) {
      patchWall({ status: status, message: message || '' });
    }

    function refreshSaved() {
      return dbAll()
        .then(function (records) {
          const sorted = (records || []).sort(function (a, b) {
            return (b.createdAt || 0) - (a.createdAt || 0);
          });
          patchWall({ saved: sorted });
          return sorted;
        })
        .catch(function () {
          patchWall({ saved: [] });
          return [];
        });
    }

    // ------------------------------------------------------- wallpaper background

    const BACKGROUND_CSS = [
      'html[data-h4x0r-wallpaper="on"]{background-color:var(--dsw-alias-bg-base)}',
      'html[data-h4x0r-wallpaper="on"] body{background-color:transparent !important;background-image:var(--h4x0r-wallpaper-image) !important;background-size:cover !important;background-position:center center !important;background-attachment:fixed !important;background-repeat:no-repeat !important}',
    ].join('\n');

    function hexToRgba(color, alpha) {
      if (typeof color !== 'string') return 'rgba(8,8,10,' + alpha + ')';
      const text = color.trim();
      const hex = /^#([0-9a-f]{6})$/i.exec(text);
      if (hex) {
        const value = parseInt(hex[1], 16);
        return (
          'rgba(' +
          ((value >> 16) & 255) +
          ',' +
          ((value >> 8) & 255) +
          ',' +
          (value & 255) +
          ',' +
          alpha +
          ')'
        );
      }
      const short = /^#([0-9a-f]{3})$/i.exec(text);
      if (short) {
        const part = short[1];
        return (
          'rgba(' +
          parseInt(part[0] + part[0], 16) +
          ',' +
          parseInt(part[1] + part[1], 16) +
          ',' +
          parseInt(part[2] + part[2], 16) +
          ',' +
          alpha +
          ')'
        );
      }
      const rgb = /^rgba?\(([^)]+)\)$/i.exec(text);
      if (rgb) {
        const parts = rgb[1].split(/[, ]+/).filter(Boolean).map(Number);
        return 'rgba(' + parts[0] + ',' + parts[1] + ',' + parts[2] + ',' + alpha + ')';
      }
      return 'rgba(8,8,10,' + alpha + ')';
    }

    function buildScrim(theme) {
      const base = tokenColor(theme, 'bg-base') || (schemeOf(theme) === 'light' ? '#f2f2ef' : '#0b0b0d');
      const light = schemeOf(theme) === 'light';
      const top = hexToRgba(base, light ? 0.5 : 0.42);
      const mid = hexToRgba(base, light ? 0.28 : 0.2);
      const low = hexToRgba(base, light ? 0.4 : 0.34);
      return 'linear-gradient(180deg,' + top + ' 0%,' + mid + ' 34%,' + low + ' 100%)';
    }

    function showWallpaper(theme, dataUrl) {
      const root = document.documentElement;
      const scrim = buildScrim(theme);
      root.style.setProperty('--h4x0r-wallpaper-image', scrim + ', url("' + dataUrl + '")');
      root.setAttribute('data-h4x0r-wallpaper', 'on');
    }

    function hideWallpaper() {
      const root = document.documentElement;
      root.removeAttribute('data-h4x0r-wallpaper');
      root.style.removeProperty('--h4x0r-wallpaper-image');
    }

    // ------------------------------------------------------------ image pipeline

    function hashBytes(bytes) {
      let hash = 0x811c9dc5;
      const step = bytes.length > 65536 ? Math.floor(bytes.length / 65536) : 1;
      for (let index = 0; index < bytes.length; index += step) {
        hash ^= bytes[index];
        hash = Math.imul(hash, 0x01000193) >>> 0;
      }
      hash ^= bytes.length;
      hash = Math.imul(hash, 0x01000193) >>> 0;
      return hash.toString(16).padStart(8, '0');
    }

    function decodeImage(source) {
      return new Promise(function (resolve, reject) {
        if (typeof window.createImageBitmap === 'function' && source instanceof Blob) {
          window.createImageBitmap(source).then(resolve, function () {
            fallback();
          });
          return;
        }
        fallback();

        function fallback() {
          const image = new window.Image();
          const url = typeof source === 'string' ? source : window.URL.createObjectURL(source);
          image.onload = function () {
            if (typeof source !== 'string') window.URL.revokeObjectURL(url);
            resolve(image);
          };
          image.onerror = function () {
            if (typeof source !== 'string') window.URL.revokeObjectURL(url);
            reject(new Error('That file is not an image this browser can decode.'));
          };
          image.src = url;
        }
      });
    }

    function drawToData(image, maxSide) {
      const width = image.width || image.naturalWidth;
      const height = image.height || image.naturalHeight;
      const scale = Math.min(1, maxSide / Math.max(width, height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas;
    }

    function canvasToDataUrl(image, maxSide) {
      const canvas = drawToData(image, maxSide);
      const webp = canvas.toDataURL('image/webp', 0.82);
      if (webp.indexOf('data:image/webp') === 0) return webp;
      return canvas.toDataURL('image/jpeg', 0.86);
    }

    // The engine gates wallpaper surfaces against a worst-case photo, which
    // pushes its alphas near opaque. For a visible backdrop we instead bake a
    // scrim into the stored image, so the pixels that show through the UI are
    // already dark (or light) enough to keep text readable.
    const WALL_SURFACE_ALPHA = {
      dark: {
        '--dsw-alias-bg-base': 0.54,
        '--dsw-alias-bg-layer-1': 0.68,
        '--dsw-alias-bg-layer-2': 0.8,
        '--dsw-alias-bg-module-platform': 0.74,
        '--dsw-specific-sidebar-fill': 0.6,
      },
      light: {
        '--dsw-alias-bg-base': 0.6,
        '--dsw-alias-bg-layer-1': 0.74,
        '--dsw-alias-bg-layer-2': 0.86,
        '--dsw-alias-bg-module-platform': 0.8,
        '--dsw-specific-sidebar-fill': 0.66,
      },
    };

    function rgbaTokens(tokens, scheme) {
      const alphas = WALL_SURFACE_ALPHA[scheme] || WALL_SURFACE_ALPHA.dark;
      const out = {};
      Object.keys(alphas).forEach(function (name) {
        out[name] = hexToRgba(tokens[name], alphas[name]);
      });
      return out;
    }

    function bakeWallpaper(image, baseColor, scheme) {
      const canvas = drawToData(image, 1920);
      const context = canvas.getContext('2d');
      const light = scheme === 'light';
      if (typeof context.filter === 'string') {
        context.filter = light
          ? 'brightness(1.04) saturate(0.86)'
          : 'brightness(0.38) saturate(1.06)';
      }
      context.drawImage(canvas, 0, 0);
      context.filter = 'none';
      context.fillStyle = hexToRgba(baseColor, light ? 0.26 : 0.45);
      context.fillRect(0, 0, canvas.width, canvas.height);
      const webp = canvas.toDataURL('image/webp', 0.82);
      if (webp.indexOf('data:image/webp') === 0) return webp;
      return canvas.toDataURL('image/jpeg', 0.86);
    }

    function themeSurfaces(opaqueTokens, scheme) {
      return Object.assign({}, opaqueTokens, rgbaTokens(opaqueTokens, scheme));
    }

    function samplePixels(image) {
      const canvas = drawToData(image, 96);
      const context = canvas.getContext('2d');
      const data = context.getImageData(0, 0, canvas.width, canvas.height);
      return { pixels: data.data, width: canvas.width, height: canvas.height };
    }

    function readFileBytes(file) {
      if (file.arrayBuffer) {
        return file.arrayBuffer().then(function (buffer) {
          return new Uint8Array(buffer);
        });
      }
      return new Promise(function (resolve, reject) {
        const reader = new window.FileReader();
        reader.onload = function () {
          resolve(new Uint8Array(reader.result));
        };
        reader.onerror = function () {
          reject(new Error('Cannot read that file.'));
        };
        reader.readAsArrayBuffer(file);
      });
    }

    function buildRecord(bytes, image, options) {
      const sample = samplePixels(image);
      const analysis = ENGINE.buildWallpaperTheme(sample.pixels, sample.width, sample.height, {
        fileName: options.fileName,
        comfort: options.comfort,
        wallpaper: true,
        forceScheme: options.forceScheme,
      });
      const hash = hashBytes(bytes);
      const id = 'wall-' + hash + (options.comfort ? '-c' : '');
      const scheme = analysis.colorScheme === 'light' ? 'light' : 'dark';
      return {
        id: id,
        hash: hash,
        name: analysis.name,
        fileName: options.fileName || 'wallpaper',
        colorScheme: scheme,
        tokens: themeSurfaces(analysis.tokens, scheme),
        opaqueTokens: analysis.tokens,
        check: analysis.check || null,
        comfort: !!options.comfort,
        dataUrl: bakeWallpaper(image, analysis.tokens['--dsw-alias-bg-base'], scheme),
        sourceDataUrl: canvasToDataUrl(image, 1920),
        createdAt: Date.now(),
      };
    }

    // --------------------------------------------------------------- theme wiring

    function registerWallTheme(ctx, record) {
      const scheme = record.colorScheme === 'light' ? 'light' : 'dark';
      if (wallDisposers.has(record.id)) {
        try {
          wallDisposers.get(record.id)();
        } catch (error) {
          // Already disposed.
        }
        wallDisposers.delete(record.id);
      }
      const disposer = ctx.theme.register({
        id: record.id,
        colorScheme: scheme,
        tokens: record.tokens,
      });
      wallDisposers.set(record.id, disposer);
      return disposer;
    }

    function applyCurated(ctx, id) {
      try {
        ctx.theme.setTheme(id);
      } catch (error) {
        return false;
      }
      runtime.persist(id);
      hideWallpaper();
      patchWall({ activeId: null, activeName: null, activeDataUrl: null });
      return true;
    }

    function applyWallRecord(ctx, record) {
      try {
        registerWallTheme(ctx, record);
        ctx.theme.setTheme(record.id);
      } catch (error) {
        setStatus('error', error && error.message ? error.message : 'Cannot apply that palette.');
        return false;
      }
      runtime.persist(record.id);
      showWallpaper({ tokens: record.tokens, colorScheme: record.colorScheme }, record.dataUrl);
      patchWall({
        activeId: record.id,
        activeName: record.name,
        activeDataUrl: record.dataUrl,
        status: 'ready',
        message: record.name,
      });
      return true;
    }

    function dropWallRecord(ctx, id) {
      const disposer = wallDisposers.get(id);
      if (disposer) {
        try {
          disposer();
        } catch (error) {
          // Already disposed.
        }
        wallDisposers.delete(id);
      }
    }

    function removeWallpaper(ctx, id) {
      const wallId = id || wallState.activeId;
      if (wallId) {
        dropWallRecord(ctx, wallId);
        dbDelete(wallId).catch(function () {});
      }
      hideWallpaper();
      patchWall({ activeId: null, activeName: null, activeDataUrl: null, status: 'idle', message: '' });
      const fallback = THEME_IDS.indexOf('h4x0r-void') !== -1 ? 'h4x0r-void' : THEME_IDS[0];
      if (fallback) {
        try {
          ctx.theme.setTheme(fallback);
          runtime.persist(fallback);
        } catch (error) {
          // The service resets to its own default when the backing theme goes.
        }
      } else {
        removeStored(STORAGE_KEY);
      }
      refreshSaved();
    }

    async function ingestFile(ctx, file) {
      if (!file) return;
      if (!/^image\//.test(file.type || '')) {
        setStatus('error', 'That file is not an image. Use PNG, JPEG, WebP or AVIF.');
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        setStatus('error', 'That image is larger than 25 MB. Pick a smaller file.');
        return;
      }
      setStatus('working', 'Reading ' + (file.name || 'image') + '.');
      try {
        const bytes = await readFileBytes(file);
        const image = await decodeImage(file);
        setStatus('working', 'Deriving a palette from the image.');
        const record = buildRecord(bytes, image, {
          fileName: file.name,
          comfort: wallState.comfort,
        });
        await dbPut(record).catch(function () {});
        await trimSaved().catch(function () {});
        const applied = applyWallRecord(ctx, record);
        if (applied) {
          setStatus('ready', record.name + '. ' + describeCheck(record.check));
          refreshSaved();
        }
      } catch (error) {
        setStatus('error', error && error.message ? error.message : 'Cannot read that image.');
      }
    }

    function describeCheck(check) {
      if (!check) return '';
      const parts = [];
      if (typeof check.labelPrimaryOnBase === 'number') {
        parts.push('Text contrast ' + check.labelPrimaryOnBase.toFixed(1) + ':1');
      }
      if (check.scheme) parts.push(check.scheme + ' scheme');
      return parts.join('. ');
    }

    async function regenerateActive(ctx, comfort) {
      const active = wallState.activeId ? await dbGet(wallState.activeId) : null;
      if (!active) return;
      setStatus('working', 'Rebuilding the palette.');
      try {
        const source = active.sourceDataUrl || active.dataUrl;
        const image = await decodeImage(source);
        const sample = samplePixels(image);
        const analysis = ENGINE.buildWallpaperTheme(sample.pixels, sample.width, sample.height, {
          fileName: active.fileName,
          comfort: comfort,
          wallpaper: true,
        });
        const scheme = analysis.colorScheme === 'light' ? 'light' : 'dark';
        const record = {
          id: active.id,
          hash: active.hash,
          name: analysis.name,
          fileName: active.fileName,
          colorScheme: scheme,
          tokens: themeSurfaces(analysis.tokens, scheme),
          opaqueTokens: analysis.tokens,
          check: analysis.check || null,
          comfort: !!comfort,
          dataUrl: bakeWallpaper(image, analysis.tokens['--dsw-alias-bg-base'], scheme),
          sourceDataUrl: canvasToDataUrl(image, 1920),
          createdAt: active.createdAt || Date.now(),
        };
        await dbPut(record).catch(function () {});
        dropWallRecord(ctx, active.id);
        applyWallRecord(ctx, record);
        setStatus('ready', record.name + '. ' + describeCheck(record.check));
        refreshSaved();
      } catch (error) {
        setStatus('error', error && error.message ? error.message : 'Cannot rebuild that palette.');
      }
    }

    // ---------------------------------------------------------------- page views

    function ThemeCard(props) {
      const theme = props.theme;
      return h(
        'button',
        {
          type: 'button',
          className: 'h4x0r-card',
          'aria-pressed': props.selected,
          title: theme.description || theme.tagline || theme.name,
          onClick: props.onPick,
        },
        h(
          'span',
          { className: 'h4x0r-preview', 'aria-hidden': 'true' },
          h('span', {
            className: 'h4x0r-chip',
            style: { background: tokenColor(theme, 'bg-base') || 'var(--dsw-alias-bg-base)' },
          }),
          h('span', {
            className: 'h4x0r-chip h4x0r-chip-label',
            style: { background: tokenColor(theme, 'label-primary') || 'var(--dsw-alias-label-primary)' },
          }),
          h('span', {
            className: 'h4x0r-chip h4x0r-chip-brand',
            style: { background: cardAccent(theme) },
          })
        ),
        h('span', { className: 'h4x0r-name' }, theme.name || theme.id),
        h(
          'span',
          { className: 'h4x0r-meta' },
          h('span', { className: 'h4x0r-dot', style: { background: cardAccent(theme) } }),
          theme.colorScheme === 'light' ? 'Light' : 'Dark'
        ),
        h('span', { className: 'h4x0r-tagline' }, theme.tagline || '')
      );
    }

    function WallpaperPanel(props) {
      const wall = props.wall;
      const inputRef = React.useRef(null);
      const [dragging, setDragging] = React.useState(false);
      const busy = wall.status === 'working';
      return h(
        'section',
        { className: 'h4x0r-panel' },
        h(
          'div',
          { className: 'h4x0r-panel-head' },
          h('h3', { className: 'h4x0r-h3' }, 'Wallpaper themes'),
          h('p', { className: 'h4x0r-sub' }, 'Drop an anime wallpaper and the pack builds a full palette from it, then sets it behind the interface. The image stays on this machine.')
        ),
        h(
          'div',
          {
            className: 'h4x0r-drop' + (dragging ? ' is-dragging' : '') + (wall.activeDataUrl ? ' has-image' : ''),
            onDragOver: function (event) {
              event.preventDefault();
              setDragging(true);
            },
            onDragLeave: function () {
              setDragging(false);
            },
            onDrop: function (event) {
              event.preventDefault();
              setDragging(false);
              const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
              if (file) props.onFile(file);
            },
          },
          wall.activeDataUrl
            ? h('img', { className: 'h4x0r-thumb', src: wall.activeDataUrl, alt: wall.activeName || 'Active wallpaper' })
            : h('div', { className: 'h4x0r-drop-hint' }, h('span', { className: 'h4x0r-drop-title' }, 'Drop a wallpaper here'), h('span', { className: 'h4x0r-tagline' }, 'PNG, JPEG, WebP or AVIF up to 25 MB')),
          h('input', {
            ref: inputRef,
            type: 'file',
            accept: 'image/*',
            className: 'h4x0r-file',
            onChange: function (event) {
              const file = event.target.files && event.target.files[0];
              if (file) props.onFile(file);
              event.target.value = '';
            },
          })
        ),
        h(
          'div',
          { className: 'h4x0r-actions' },
          h(
            'button',
            {
              type: 'button',
              className: 'h4x0r-button',
              disabled: busy,
              onClick: function () {
                if (inputRef.current) inputRef.current.click();
              },
            },
            wall.activeDataUrl ? 'Replace image' : 'Choose image'
          ),
          wall.activeDataUrl
            ? h(
                'button',
                {
                  type: 'button',
                  className: 'h4x0r-button is-quiet',
                  disabled: busy,
                  onClick: props.onRemove,
                },
                'Remove wallpaper'
              )
            : null,
          h(
            'label',
            { className: 'h4x0r-check' },
            h('input', {
              type: 'checkbox',
              checked: wall.comfort,
              onChange: function (event) {
                props.onComfort(event.target.checked);
              },
            }),
            'Comfort mode'
          )
        ),
        wall.message
          ? h('p', { className: 'h4x0r-status' + (wall.status === 'error' ? ' is-error' : '') }, wall.message)
          : null,
        wall.saved && wall.saved.length
          ? h(
              'div',
              { className: 'h4x0r-saved' },
              h('span', { className: 'h4x0r-label' }, 'Recent wallpapers'),
              h(
                'div',
                { className: 'h4x0r-strip' },
                wall.saved.map(function (record) {
                  return h(
                    'button',
                    {
                      key: record.id,
                      type: 'button',
                      className: 'h4x0r-saved-item' + (wall.activeId === record.id ? ' is-active' : ''),
                      title: record.name,
                      onClick: function () {
                        props.onApplySaved(record);
                      },
                    },
                    h('img', { src: record.dataUrl, alt: '', className: 'h4x0r-saved-thumb' })
                  );
                })
              )
            )
          : null
      );
    }

    function ThemesPage() {
      const snapshot = React.useSyncExternalStore(runtime.subscribe, runtime.getSnapshot, runtime.getSnapshot);
      const wall = React.useSyncExternalStore(subscribeWall, getWall, getWall);
      const activeId = snapshot.preference;
      const ctx = runtime.ctx;

      return h(
        'div',
        { className: 'h4x0r-page' },
        h(
          'header',
          { className: 'h4x0r-header' },
          h('h2', { className: 'h4x0r-h2' }, 'Themes'),
          h('p', { className: 'h4x0r-sub' }, 'Full palettes for the whole interface. Appearance in General still switches the built-in Light and Dark.')
        ),
        h(WallpaperPanel, {
          wall: wall,
          onFile: function (file) {
            ingestFile(ctx, file);
          },
          onRemove: function () {
            removeWallpaper(ctx);
          },
          onComfort: function (next) {
            writeComfort(next);
            patchWall({ comfort: next });
            if (wall.activeId) {
              regenerateActive(ctx, next);
            }
          },
          onApplySaved: function (record) {
            applyWallRecord(ctx, record);
            refreshSaved();
          },
        }),
        PACKS.map(function (pack) {
          return h(
            'section',
            { className: 'h4x0r-panel', key: pack.id },
            h(
              'div',
              { className: 'h4x0r-panel-head' },
              h('h3', { className: 'h4x0r-h3' }, pack.name || pack.id),
              pack.tagline ? h('p', { className: 'h4x0r-sub' }, pack.tagline) : null
            ),
            h(
              'div',
              { className: 'h4x0r-grid' },
              (pack.themes || []).map(function (theme) {
                return h(ThemeCard, {
                  key: theme.id,
                  theme: theme,
                  selected: activeId === theme.id,
                  onPick: function () {
                    applyCurated(ctx, theme.id);
                  },
                });
              })
            )
          );
        }),
        h(
          'p',
          { className: 'h4x0r-footnote' },
          'Palette choice is stored in this browser. The Harness persists only Light, Dark and System.'
        ),
        h('style', { 'data-h4x0r-themes': 'page' }, PAGE_CSS)
      );
    }

    // ---------------------------------------------------------------------- CSS

    const PAGE_CSS = [
      '.h4x0r-page{display:flex;flex-direction:column;gap:20px;padding:4px 0 24px;color:var(--dsw-alias-label-primary)}',
      '.h4x0r-header{display:flex;flex-direction:column;gap:4px}',
      '.h4x0r-h2{margin:0;font-size:18px;line-height:26px;font-weight:500}',
      '.h4x0r-h3{margin:0;font-size:14px;line-height:22px;font-weight:500}',
      '.h4x0r-sub{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.h4x0r-panel{display:flex;flex-direction:column;gap:12px;padding:16px;border:.5px solid var(--dsw-alias-border-l2);border-radius:14px;background:var(--dsw-alias-bg-layer-1)}',
      '.h4x0r-panel-head{display:flex;flex-direction:column;gap:2px}',
      '.h4x0r-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:8px}',
      '.h4x0r-card{box-sizing:border-box;display:flex;flex-direction:column;gap:6px;padding:12px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:transparent;font:inherit;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;transition:background .12s ease,border-color .12s ease}',
      '.h4x0r-card:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.h4x0r-card[aria-pressed="true"]{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-interactive-bg-hover)}',
      '.h4x0r-card:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.h4x0r-preview{display:flex;flex-direction:column;gap:3px;width:100%;padding:6px;border-radius:8px;background:transparent}',
      '.h4x0r-chip{display:block;height:6px;border-radius:3px}',
      '.h4x0r-chip-label{width:62%}',
      '.h4x0r-chip-brand{width:36%}',
      '.h4x0r-name{font-size:13px;font-weight:500;line-height:20px}',
      '.h4x0r-meta{display:flex;align-items:center;gap:6px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.h4x0r-dot{width:6px;height:6px;border-radius:50%}',
      '.h4x0r-tagline{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.h4x0r-drop{position:relative;display:flex;align-items:center;justify-content:center;min-height:132px;border:1px dashed var(--dsw-alias-border-l3);border-radius:12px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}',
      '.h4x0r-drop.is-dragging{border-color:var(--dsw-alias-brand-primary)}',
      '.h4x0r-drop.has-image{border-style:solid}',
      '.h4x0r-drop-hint{display:flex;flex-direction:column;align-items:center;gap:4px;padding:20px;text-align:center}',
      '.h4x0r-drop-title{font-size:13px;line-height:20px}',
      '.h4x0r-thumb{display:block;width:100%;max-height:220px;object-fit:cover}',
      '.h4x0r-file{display:none}',
      '.h4x0r-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}',
      '.h4x0r-button{font:inherit;font-size:13px;line-height:20px;padding:6px 12px;border-radius:8px;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);cursor:pointer}',
      '.h4x0r-button:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.h4x0r-button:disabled{color:var(--dsw-alias-label-caption);cursor:default}',
      '.h4x0r-button.is-quiet{background:transparent}',
      '.h4x0r-check{display:flex;align-items:center;gap:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.h4x0r-status{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.h4x0r-status.is-error{color:var(--dsw-alias-state-error-primary)}',
      '.h4x0r-saved{display:flex;flex-direction:column;gap:6px}',
      '.h4x0r-label{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.h4x0r-strip{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}',
      '.h4x0r-saved-item{flex:0 0 auto;width:72px;height:44px;padding:0;border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;overflow:hidden;background:transparent;cursor:pointer}',
      '.h4x0r-saved-item.is-active{border-color:var(--dsw-alias-brand-primary)}',
      '.h4x0r-saved-thumb{display:block;width:100%;height:100%;object-fit:cover}',
      '.h4x0r-footnote{margin:0;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
    ].join('\n');

    // --------------------------------------------------------------------- apply

    function apply(ctx) {
      runtime = createRuntime(ctx);
      bootAt = Date.now();
      patchWall({ comfort: readComfort() });

      // Page and wallpaper stylesheet. Owned by the plugin fiber.
      ctx.effect(function () {
        const style = document.createElement('style');
        style.setAttribute('data-h4x0r-themes', 'background');
        style.textContent = BACKGROUND_CSS;
        document.head.appendChild(style);
        return function () {
          if (style.parentNode) style.parentNode.removeChild(style);
        };
      });

      ctx.effect(function () {
        return ctx.on('theme/change', function (snapshot) {
          runtime.publish(snapshot);
          if (reapplying) return;
          if (isKnownId(snapshot.preference)) return;
          const saved = readSavedTheme();
          if (saved !== null && isWallId(saved) && !wallDisposers.has(saved)) return;
          if (Date.now() - bootAt < BOOT_GRACE_MS) {
            if (saved !== null && isKnownId(saved)) {
              reapplying = true;
              try {
                ctx.theme.setTheme(saved);
              } catch (error) {
                removeStored(STORAGE_KEY);
              } finally {
                reapplying = false;
              }
            }
            return;
          }
          removeStored(STORAGE_KEY);
        });
      });

      ctx.effect(function () {
        const disposers = CURATED.map(function (theme) {
          return ctx.theme.register({
            id: theme.id,
            colorScheme: schemeOf(theme),
            tokens: theme.tokens,
          });
        });
        return function () {
          for (let index = disposers.length - 1; index >= 0; index -= 1) {
            try {
              disposers[index]();
            } catch (error) {
              // Already disposed.
            }
          }
          wallDisposers.forEach(function (dispose) {
            try {
              dispose();
            } catch (error) {
              // Already disposed.
            }
          });
          wallDisposers.clear();
        };
      });

      ctx.effect(function () {
        const saved = readSavedTheme();
        if (saved === null) return;
        if (isCuratedId(saved)) {
          try {
            ctx.theme.setTheme(saved);
          } catch (error) {
            removeStored(STORAGE_KEY);
          }
          return;
        }
        if (!isWallId(saved)) return;
        dbGet(saved)
          .then(function (record) {
            if (!record) {
              removeStored(STORAGE_KEY);
              return;
            }
            applyWallRecord(ctx, record);
            refreshSaved();
          })
          .catch(function () {
            // Storage failed. Keep the current palette.
          });
      });

      ctx.effect(function () {
        refreshSaved();
      });

      ctx.effect(function () {
        return ctx.slots.inject('settings.section', function () {
          return ctx.slots.register(
            {
              name: 'settings.section',
              id: 'h4x0r-themes',
              order: 5,
              label: function () {
                return 'Themes';
              },
            },
            ThemesPage
          );
        });
      });
    }

    return { inject: ['theme', 'slots'], apply: apply };
  },
});
