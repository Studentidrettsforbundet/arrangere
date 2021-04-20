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
    buttons: Array<string>;
  };
};

type ChapterWithName = {
  chapter: Chapter;
  chapterName: string;
};

//extra info about the inputfield objects passed to the different input field types
type InputProps = {
  desc: string;
  id: string;
  chapterName: string;
};

//the actual input field object
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

type AccordionsProps = {
  title: string;
  mainDesc: string;
  key: string;
  chapterName: string;
  attributeName: string;
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

type HomeAccordionProps = {
  desc: string;
  priority: number;
  title: string;
};

type AppCardProps = {
  applicationId: string;
  collectionName: string;
  to: string;
  onChange: (isUpdate: boolean) => void;
};

type AccordionProps = {
  name: string;
  inputFields: Array<InputField>;
  priority: number;
  title: string;
  mainDesc: string;
  chapterName: string;
  onAccordionDelete: (isDeleted: boolean) => void;
};
