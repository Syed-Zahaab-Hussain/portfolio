import { requireOwner } from "@/lib/owner";
import { Editor } from "../project-editor";
export default async function NewProject() { await requireOwner(); return <Editor />; }

