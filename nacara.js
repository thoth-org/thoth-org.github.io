const standard = require('nacara/dist/layouts/standard/Export').default;
const mdMessage = require('nacara/dist/js/utils').mdMessage;
const React = require('react');
const prelude = require('nacara/dist/layouts/standard/Prelude');
const markdown = require('nacara/dist/js/utils').markdown;

const homepageLayout = (model, pageContext) => {
    return new Promise((resolve, reject) => {

        // Use the markdown converter exposed by your F# layout
        const html = { __html: markdown(pageContext.Content, model.Config.Plugins.Markdown) };

        const content = <div className="content" dangerouslySetInnerHTML={html} />;

        // Re-use existing base page (writting in F#)
        const page = prelude.basePage(model, pageContext.Attributes.Title, content);
        resolve(page);
    })
}

module.exports = {
    githubURL: "https://github.com/thoth-org/thoth-org.github.io",
    url: "https://thoth-org.github.io/",
    source: "docs",
    output: "docs_deploy",
    baseUrl: "/",
    editUrl: "https://github.com/thoth-org/thoth-org.github.io/edit/master/docs",
    title: "Thoth",
    debug: true,
    version: "0.0.0",
    navbar: {
        links: [
            {
                href: "/index.html",
                label: "Documentation",
                icon: "fas fa-book"
            },
            {
                href: "https://gitter.im/fable-compiler/Fable",
                label: "Support",
                icon: "fab fa-gitter",
                isExternal: true
            },
            {
                href: "https://github.com/thoth-org/",
                icon: "fab fa-github",
                isExternal: true
            },
            {
                href: "https://twitter.com/MangelMaxime",
                icon: "fab fa-twitter",
                isExternal: true,
                color: "#55acee"
            }
        ]
    },
    layouts: {
        default: standard.Default,
        changelog: standard.Changelog,
        homepage: homepageLayout
    },
    plugins: {
        markdown: [
            {
                path: 'markdown-it-container',
                args: [
                    'warning',
                    mdMessage("warning")
                ]
            },
            {
                path: 'markdown-it-container',
                args: [
                    'info',
                    mdMessage("info")
                ]
            },
            {
                path: 'markdown-it-container',
                args: [
                    'success',
                    mdMessage("success")
                ]
            },
            {
                path: 'markdown-it-container',
                args: [
                    'danger',
                    mdMessage("danger")
                ]
            },
            {
                path: 'nacara/dist/js/markdown-it-anchored.js'
            },
            {
                path: 'nacara/dist/js/markdown-it-toc.js'
            }
        ]
    }
};
