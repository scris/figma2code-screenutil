import { AltSceneNode } from "../../altNodes/altMixins";
import { numToAutoFixed } from "../../common/numToAutoFixed";
import { commonPadding } from "../../common/commonPadding";

// Add padding if necessary!
// This must happen before Stack or after the Positioned, but not before.
export const flutterPadding = (node: AltSceneNode): string => {
  if (!("layoutMode" in node)) {
    return "";
  }

  const padding = commonPadding(node);
  if (!padding) {
    return "";
  }

  if ("all" in padding) {
    return `\npadding: EdgeInsets.all(${numToAutoFixed(padding.all)}.r),`;
  }

  // horizontal and vertical, as the default AutoLayout
  if (
    padding.horizontal + padding.vertical !== 0 &&
    padding.top + padding.bottom + padding.left + padding.right === 0
  ) {
    const propHorizontalPadding =
      padding.horizontal > 0
        ? `horizontal: ${numToAutoFixed(padding.horizontal)}.w, `
        : "";

    const propVerticalPadding =
      padding.vertical > 0
        ? `vertical: ${numToAutoFixed(padding.vertical)}.h, `
        : "";

    return `\npadding: EdgeInsets.symmetric(${propHorizontalPadding}${propVerticalPadding}),`;
  }

  let comp = "";

  // if left and right exists, verify if they are the same after [pxToLayoutSize] conversion.
  if (padding.left) {
    comp += `left: ${numToAutoFixed(padding.left)}.w, `;
  }
  if (padding.right) {
    comp += `right: ${numToAutoFixed(padding.right)}.w, `;
  }
  if (padding.top) {
    comp += `top: ${numToAutoFixed(padding.top)}.r, `;
  }
  if (padding.bottom) {
    comp += `bottom: ${numToAutoFixed(padding.bottom)}.r, `;
  }

  if (comp !== "") {
    return `\npadding: EdgeInsets.only(${comp}),`;
  }

  return "";
};
