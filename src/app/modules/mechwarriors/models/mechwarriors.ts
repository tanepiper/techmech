export interface Mechwarrior {
  id?: number;
  name: string;
  description: string;
  stats: {
    gunnery: number;
    piloting: number;
    guts: number;
    tactics: number;
  };
  skills: string[];
}

export interface Skill {
  name: string;
  description: string;
}

export interface SkillLevels {
  gunnery: {
    levels?: {
      [key: string]: {
        XP: string;
        bonus: string;
        skills: Skill[];
      };
    };
  };
  piloting: {
    levels?: {
      [key: string]: {
        XP: string;
        bonus: string;
        skills: Skill[];
      };
    };
  };
  guts: {
    levels?: {
      [key: string]: {
        XP: string;
        bonus: string;
        skills: Skill[];
      };
    };
  };
  tactics: {
    levels?: {
      [key: string]: {
        XP: string;
        bonus: string;
        skills: Skill[];
      };
    };
  };
}
