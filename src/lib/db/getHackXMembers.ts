import { supabase } from '../supabase';
import { TEAM_MEMBERS, TeamMember, TeamYear, TeamCategory } from '@/data/team';

export async function getHackXMembers(): Promise<TeamMember[]> {
  if (!supabase) {
    console.warn('[HackX DB] Supabase client unavailable. Falling back to static team members.');
    return TEAM_MEMBERS;
  }

  try {
    const fetchPromise = supabase
      .from('hackx_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: { message: 'Fetch timeout (3s)' } }), 3000)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (error || !data || data.length === 0) {
      if (error) {
        console.error('[HackX DB] Error fetching hackx_members from Supabase:', error.message);
      }
      return TEAM_MEMBERS;
    }

    const mappedMembers: TeamMember[] = data.map((row: any) => {
      const groupLower = (row.group || '').toLowerCase();
      let category: TeamCategory = 'CORE';
      let subTeam: string | undefined = undefined;

      if (groupLower === 'faculty' || groupLower === 'convener') {
        category = 'FACULTY';
        if (groupLower === 'convener') {
          subTeam = 'CONVENERS';
        }
      } else if (groupLower === 'ec') {
        category = 'EXECUTIVE';
      } else if (groupLower === 'core') {
        category = 'CORE';
      }

      const socials = {
        linkedin: row.linkedin_url || undefined,
        github: row.github_url || undefined,
        instagram: row.instagram_url || undefined,
        email: row.email || undefined,
      };

      const hasSocials = Object.values(socials).some(Boolean);

      return {
        id: row.id,
        name: row.name,
        role: row.role,
        year: (row.year || '2026') as TeamYear,
        category,
        subTeam,
        image: row.image_url || undefined,
        email: row.email || undefined,
        socials: hasSocials ? socials : undefined,
      };
    });

    return mappedMembers;
  } catch (err) {
    console.error('[HackX DB] Exception fetching hackx_members:', err);
    return TEAM_MEMBERS;
  }
}
