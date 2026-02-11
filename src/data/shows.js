import { supabase } from "./supabaseClient";

export async function getShows() {
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;


  return data.map(show => ({
   ...show,
   imageUrl: show.image_url
}));

}

export async function getShow(id) {
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return { 
    ...data,
    imageUrl: data.image_url,
    details: data.description
}
}

export async function createShow(showData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("shows").insert({
    ...showData,
    user_id: user.id,
  });

  if (error) throw error;
}

export async function editShow(id, showData) {
  const { error } = await supabase
    .from("shows")
    .update(showData)
    .eq("id", id);

  if (error) throw error;
}

export async function removeShow(id) {
  const { error } = await supabase
    .from("shows")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function searchShow(query) {
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .ilike("title", `%${query}%`);

  if (error) throw error;

  return data.map(show => ({
    ...show,
    imageUrl: show.image_url,
    details: show.description
  }));
}

