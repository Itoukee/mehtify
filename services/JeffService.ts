export const reverseChild = (child: string) => {
  try {
    const arrayChild = child.split("");
    return arrayChild.reverse().toString().replaceAll(",", "");
  } catch (error) {
    console.error(error);
  }
};
