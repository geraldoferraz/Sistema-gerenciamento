import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import colors from "tailwindcss/colors"

import { BarChart } from "lucide-react";

const data = [
    { product: 'Pepperoni', amount: 40 },
    { product: 'Mussarela', amount: 27 },
    { product: 'Marguerita', amount: 19 },
    { product: '4 Queijos', amount: 37 },
    { product: 'Frango com catupiry', amount: 65 },
]

const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500]
]

export function PopularProductChart(){
    return(
        <Card className="col-span-3">
            <CardHeader className="pb-8">
                <div className="flex items-center justify-between">
                    <CardTitle  className="text-base font-medium">Produtos populares</CardTitle>
                    <BarChart className="w-4 h-4 text-muted-foreground"/>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={263.5}>
                    <PieChart style={{ fontSize: 12 }}>
                        <Pie 
                        data={data} 
                        dataKey="amount" 
                        nameKey="product" 
                        cx="50%" cy="50%" 
                        outerRadius={96} 
                        innerRadius={64} 
                        strokeWidth={8} 
                        labelLine={false}
                        label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            value,
                            index,
                          }) => {
                            const RADIAN = Math.PI / 180
                            const radius = 12 + innerRadius + (outerRadius - innerRadius)
                            const x = cx + radius * Math.cos(-midAngle * RADIAN)
                            const y = cy + radius * Math.sin(-midAngle * RADIAN)
                          
                            return (
                              <text
                                x={x}
                                y={y}
                                className="fill-muted-foreground text-xs"
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                              >
                                {data[index].product.length > 20
                                  ? data[index].product.substring(0, 20).concat('...')
                                  : data[index].product}{' '}
                                ({value})
                              </text>
                            )
                          }}
                        
                        >
                            {data.map((_, i) => {
                                return(
                                    <Cell key={`cell-${i}`} fill={COLORS[i]} className="stroke-background hover:opacity-80"/>
                                )
                            })}
                            <Cell />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
  );
}