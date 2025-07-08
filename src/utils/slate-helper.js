import { Text } from "slate";

export const serialize = (node) => {
  if (Text.isText(node)) {
    let text = node.text;
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    return text;
  }
  const children = node.children.map(serialize).join("");
  switch (node.type) {
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "image":
      return `<img src="${node.url}" alt="" />`;
    case "link":
      return `<a href="${node.url}">${children}</a>`;
    default:
      return `<p>${children}</p>`;
  }
};

export const deserialize = (el) => {
  if (el.nodeType === 3) return { text: el.textContent };
  if (el.nodeType !== 1) return null;

  const children = Array.from(el.childNodes).map(deserialize).filter(Boolean);

  switch (el.nodeName) {
    case "H1":
      return { type: "heading-one", children };
    case "H2":
      return { type: "heading-two", children };
    case "P":
      return { type: "paragraph", children };
    case "IMG":
      return {
        type: "image",
        url: el.getAttribute("src"),
        children: [{ text: "" }],
      };
    case "A":
      return {
        type: "link",
        url: el.getAttribute("href"),
        children,
      };
    case "STRONG":
      return children.map((child) =>
        child && child.text
          ? { ...child, bold: true }
          : child
      );
    case "EM":
      return children.map((child) =>
        child && child.text
          ? { ...child, italic: true }
          : child
      );
    default:
      return { type: "paragraph", children };
  }
};
