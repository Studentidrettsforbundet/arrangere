/// <reference types="react-scripts" />

type ChapterWithID = {
  id: string;
  content: {
    title: string;
    desc: string;
    attributes: Array<Attribute>;
    priority: number;
  };
};

type InputFieldProps = {
  desc: string;
  id: string;
  chapterName: string;
};
