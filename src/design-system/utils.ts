import { css } from "@emotion/react";

const SPACING_UNIT = 4;

/**
 * Returns a non-responsive size in number.
 * Should be used for `width`, `height`, `line-height`, etc.
 **/
const getSizeNumber = (size: number) => size * SPACING_UNIT;

/**
 * Defines a non-responsive size.
 * Should be used for `width`, `height`, `line-height`, etc.
 **/
export const getSize = (size: number) => css`
  ${`${getSizeNumber(size)}px`}
`;

/**
 * Defines a responsive spacing.
 * Should be used only for `margin` and `padding` CSS attributes.
 **/
export const getSpacing = (spacing: number) => {
  // the minimum spacing should be 4px
  if (Math.abs(spacing) === 1) {
    return getSize(spacing);
  }

  return css`
    ${`calc(${spacing}px * var(--spacing-unit))`}
  `;
};
