import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nzxxeifraxzwpllcstpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56eHhlaWZyYXh6d3BsbGNzdHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzczNzQsImV4cCI6MjA4MDI1MzM3NH0.AV3-xKcfjtrqn66g1UysDWZ10vSpjUwcMdk1NgXD8PE';

export const supabase = createClient(supabaseUrl, supabaseKey);