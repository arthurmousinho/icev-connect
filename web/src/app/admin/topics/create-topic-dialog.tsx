import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { TopicForm } from "./topic-form"

export function CreateTopicDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus />
                    Novo Tópico
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Novo Tópico
                    </DialogTitle>
                </DialogHeader>
                <TopicForm />
            </DialogContent>
        </Dialog>
    )
}