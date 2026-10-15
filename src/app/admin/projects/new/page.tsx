import { requireOwner } from "@/lib/owner";
import { Editor } from "../editor";
export default async function NewProject() { await requireOwner(); return <Editor />; }
