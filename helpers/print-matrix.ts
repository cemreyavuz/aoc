export const printMatrix = <T = unknown>(
  matrix: T[][],
  transformItem?: (item: T) => void
) => {
  matrix.forEach((row) => {
    console.log(
      row
        .map((item) => {
          return transformItem?.(item) ?? item;
        })
        .join("")
    );
  });
};
