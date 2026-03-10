const markdownIt = require("markdown-it");
const md = new markdownIt({ html: true, breaks: true });

module.exports = function (eleventyConfig) {
  // Render markdown strings in frontmatter (used for section body text)
  eleventyConfig.addFilter("markdownify", (content) => {
    if (!content) return "";
    return md.render(content);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: ".",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
