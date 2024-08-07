import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthCard(){
    return(
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Receita total (mês)</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">
                    R$ 20.595,49
                </span>
                <p className="text-xs text-muted-foreground pt-2">
                    <span className="text-emerald-500 dark:text-emerald-400">+2%</span> em relação ao mês passado
                </p>
            </CardContent>
        </Card>
    )
}