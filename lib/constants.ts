/**
 * External service URLs and ecosystem links for Brainlife.
 * Centralized here to avoid duplicated hardcoded URLs across Navbar, Footer, and features.
 */
export const EXTERNAL_LINKS = {
    // Web Portal & Computing Dashboard
    PORTAL: 'https://connects.brainlife.io/dashboard',
    PORTAL_LEGACY: 'https://brainlife.io/projects',
    MAIN_SITE: 'https://brainlife.io',

    // Ecosystem Apps & Datasets
    APPS: 'https://connects.brainlife.io/apps?scope=public',
    DATASETS: 'https://brainlife.io/datasets',
    EZBIDS: 'https://brainlife.io/ezbids/',
    EZGOV: 'https://brainlife.io/ezgov',
    DICOMPARE: 'https://brainlife.io/dicompare/',
    SKAI: 'https://brainlife.io/',

    // Documentation & Publications
    DOCS: 'https://brainlife.github.io/docs-next/',
    TUTORIALS: 'https://brainlife.io/docs/tutorial/introduction-to-brainlife/',
    DATATYPES: 'https://brainlife.io/docs/user/datatypes/',
    CLI_GUIDE: 'https://brainlife.io/docs/cli/install/',
    APP_DEV: 'https://brainlife.io/docs/apps/introduction/',
    PUBLICATIONS: 'https://brainlife.io/docs/user/publication/',
    CONTACT: 'https://brainlife.io/docs/contact/',
    CAREERS: 'https://brainlife.io/docs/careers/jobs/',
    PRIVACY: 'https://brainlife.io/docs/privacy/',

    // Community & Social
    GITHUB: 'https://github.com/brainlife',
    SLACK: 'https://brainlife.slack.com',
    PESTILLI_LAB: 'https://pestillilab.github.io/',
    PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.brainlife.mobile',
} as const;
