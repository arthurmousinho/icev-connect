import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { findAllTopicsRequest } from "@/http/topic/find-all-topics.http"

export async function TopicSelect() {

    const { data } = await findAllTopicsRequest();

    return (
        <Select>
            <SelectTrigger className="w-full border-none shadow-none p-0">
                <SelectValue placeholder="Selecione o tópico" />
            </SelectTrigger>
            <SelectContent>
                {data.map((topic) => (
                    <SelectItem
                        key={topic.id}
                        value={topic.id}
                    >
                        {topic.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}