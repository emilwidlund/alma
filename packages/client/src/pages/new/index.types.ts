import { Session } from '@supabase/supabase-js';
import { Project } from '~/models/Project/Project.types';

export type EditorProps = { initialSession: Session; project: Project };
