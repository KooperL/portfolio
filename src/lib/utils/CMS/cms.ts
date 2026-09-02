export interface CmsDocumentObject {
  _meta: CmsMeta,
  _definitions: CmsDefinitions,
  root: CmsRootNode[]
}

export interface CmsMeta {
  id: string,
  author: string,
  description: string,
  revisions: MetaRevisionsObject,
}

export interface MetaRevisionsObject {
  major: string,
  minor: string,
}

export interface CmsDefinitions {
  tokens: Record<string, string>
  i18n: Record<string, string>
  media: Record<string, CmsMedia>
  styleClasses: Record<string, string>
}

export type CmsMediaKind = "icon" | "image";

export interface CmsBundledMedia {
  kind: CmsMediaKind;
  source: "bundled";
  ref: string;
}

export interface CmsRemoteMedia {
  kind: CmsMediaKind;
  source: "remote";
  ref: string;
}

export type CmsMedia = CmsBundledMedia | CmsRemoteMedia;

export interface CmsRootNode {
  page: CmsPage,
  children: CmsNode[],
}


export interface CmsPage {
  slug: string;
  id: string;
  title: string;
  description: string;
}

export interface CmsNode {
  id: string;
  type: string;
  props?: CmsNodeProps;
  styling?: string;
  events?: CmsEvent[];
  children?: CmsNode[];
  repeat?: CmsRepeat;
  gate?: CmsGate;
}

type CmsNodeProps = Record<string, string>


type DOMEvent = string
type FunctionName = string
type FunctionParams = Record<string, string>
export interface CmsEvent {
  type: DOMEvent;
  name?: FunctionName;
  params?: FunctionParams;
}

export interface CmsRepeat {
  dataSource: string;
  itemKey: string;
}

export interface CmsGate {
  allOf?: string[];
  not?: string[];
  eval?: "all" | "any" | (string & {});
}
