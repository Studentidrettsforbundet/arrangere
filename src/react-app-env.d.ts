/// <reference types="react-scripts" />

type Chapter = {
  chapterName: string;
  title: string;
  desc: string;
  attributes: Array<Attribute>;
  priority: number;
  buttons: Array<string>;
};

type ChapterWithID = {
  id: string;
  content: {
    title: string;
    desc: string;
    attributes: Array<Attribute>;
    priority: number;
  };
};

type ChapterWithName = {
  chapter: Chapter;
  chapterName: string;
};

type InputFieldProps = {
  desc: string;
  id: string;
  chapterName: string;
};

type InputField = {
  type: string;
  desc: string;
  priority: number;
  id: string;
};

type InputWrapperProps = {
  title: string;
  mainDesc: string;
  key: string;
  inputFields: Array<InputField>;
  buttons: Array<string>;
  chapterName: string;
  attributeName: string;
  priority: number;
};

type Attribute = {
  title: string;
  mainDesc: string;
  inputFields: Array<InputField>;
  priority: number;
};

type AttributeObject = {
  name: string;
  attribute: Attribute[];
};

type CardProps = {
  image: string;
  title: string;
  to: string;
  template: string;
};

type ButtonProps = {
  key: number;
  title: string;
  priority: number;
};

type ReceivedApplicationProps = {
  collectionName: string;
};

type ErrorTypes = {
  status: ErrorStatus;
  text: ErrorText;
};

type InfoLongTextProps = {
  desc: string;
  priority: number;
  title: string;
};
