import { Session, User } from '@supabase/supabase-js';
import { Profile } from '~/models/Profile/Profile.types';
import { Project } from '~/models/Project/Project.types';

export type ProfileProps = { initialSession: Session; profile: Profile; projects: Project[] };
