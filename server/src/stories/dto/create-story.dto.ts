export class CreateStoryDto {
  created_at: Date;
  title?: any;
  url?: any;
  author: string;
  points?: any;
  story_text?: any;
  comment_text: string;
  num_comments?: any;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface Author {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface CommentText {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface StoryTitle {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface StoryUrl {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface HighlightResult {
  author: Author;
  comment_text: CommentText;
  story_title: StoryTitle;
  story_url: StoryUrl;
}
