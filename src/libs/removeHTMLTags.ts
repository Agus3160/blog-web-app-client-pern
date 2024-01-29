const removeHTMLTags = (str: string): string => {
  return str.replace(/(<([^>]+)>)/ig, "");
}

export default removeHTMLTags