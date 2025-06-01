import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { Paginator } from "@/components/paginator";
import { UserRoleBadge } from "./user-role-badge";

type UsersPageProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {

    const params = await searchParams;
    const currentPage = parseInt((params.page as string) || '1');
    const currentLimit = parseInt((params.limit as string) || '10');

    return (
        <div className="space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                    Usuários
                </h2>
            </header>
            <main>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarFallback>AM</AvatarFallback>
                                    <AvatarImage src="https://github.com/arthurmousinho.png" />
                                </Avatar>
                                Arthur Mousinho
                            </TableCell>
                            <TableCell>
                                arthur.mousinho
                            </TableCell>
                            <TableCell>
                                arthur.mousinho@icev.com
                            </TableCell>
                            <TableCell>
                                <UserRoleBadge role="USER" />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="icon">
                                    <MoreVertical />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Paginator
                                    meta={{
                                        hasNextPage: false,
                                        hasPreviousPage: true,
                                        lastPage: 3,
                                        limit: 10,
                                        total: 100,
                                        page: 1
                                    }}
                                    showing={20}
                                    basePath="/admin/users"
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </main>
        </div>
    )
}