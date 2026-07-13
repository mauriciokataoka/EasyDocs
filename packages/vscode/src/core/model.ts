export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  raw: string;
}

export interface Feature {
  id: string;
  title: string;
  body: string;
  status?: string;
  group?: string;
  line: number;
}

export interface VersionGroup {
  version: SemVer | null;
  label: string;
  date?: string;
  features: Feature[];
  line: number;
}

export interface RoadmapDoc {
  kind: "roadmap" | "changelog";
  title: string;
  path: string;
  versions: VersionGroup[];
  orphans: Feature[];
}

export type AdrStatus = string;

export interface AdrSection {
  heading: string;
  body: string;
  line: number;
}

export interface Adr {
  id: string;
  title: string;
  status: AdrStatus;
  date?: string;
  sections: AdrSection[];
  file: string;
}

export interface AdrTree {
  byStatus: Map<AdrStatus, Adr[]>;
  all: Adr[];
}

export interface GenericDoc {
  name: string;
  path: string;
  title: string;
  raw: string;
}

export interface ProjectDocs {
  roadmap?: RoadmapDoc;
  changelog?: RoadmapDoc;
  adrs?: AdrTree;
  others: GenericDoc[];
}
