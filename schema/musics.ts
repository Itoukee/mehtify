import { IsNumber, IsString } from "class-validator";

export class Music {
  @IsNumber()
  id!: number;

  @IsString()
  title!: string;

  @IsString()
  imageUrl!: string;

  @IsString()
  path!: string;
}

const musics: Music[] = [
  {
    id: 0,
    title: "Loli kami",
    imageUrl: "https://i.postimg.cc/J0XtjzRf/image.png",
    path: "loli-kami.mp3",
  },
  {
    id: 1,
    title: "Idol",
    imageUrl: "https://i.postimg.cc/k44bRC6C/image.png",
    path: "idol.mp3",
  },
];

export { musics };
