import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type productModel = runtime.Types.Result.DefaultSelection<Prisma.$productPayload>;
export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type ProductAvgAggregateOutputType = {
    id: number | null;
    price: number | null;
    quantity: number | null;
};
export type ProductSumAggregateOutputType = {
    id: number | null;
    price: number | null;
    quantity: number | null;
};
export type ProductMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    price: number | null;
    imageUrl: string | null;
    quantity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    description: string | null;
    price: number | null;
    imageUrl: string | null;
    quantity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    price: number;
    imageUrl: number;
    quantity: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductAvgAggregateInputType = {
    id?: true;
    price?: true;
    quantity?: true;
};
export type ProductSumAggregateInputType = {
    id?: true;
    price?: true;
    quantity?: true;
};
export type ProductMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    imageUrl?: true;
    quantity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    imageUrl?: true;
    quantity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    imageUrl?: true;
    quantity?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithRelationInput | Prisma.productOrderByWithRelationInput[];
    cursor?: Prisma.productWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCountAggregateInputType;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProduct[P]> : Prisma.GetScalarType<T[P], AggregateProduct[P]>;
};
export type productGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithAggregationInput | Prisma.productOrderByWithAggregationInput[];
    by: Prisma.ProductScalarFieldEnum[] | Prisma.ProductScalarFieldEnum;
    having?: Prisma.productScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type ProductGroupByOutputType = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type GetProductGroupByPayload<T extends productGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]>;
}>>;
export type productWhereInput = {
    AND?: Prisma.productWhereInput | Prisma.productWhereInput[];
    OR?: Prisma.productWhereInput[];
    NOT?: Prisma.productWhereInput | Prisma.productWhereInput[];
    id?: Prisma.IntFilter<"product"> | number;
    name?: Prisma.StringFilter<"product"> | string;
    description?: Prisma.StringFilter<"product"> | string;
    price?: Prisma.FloatFilter<"product"> | number;
    imageUrl?: Prisma.StringFilter<"product"> | string;
    quantity?: Prisma.IntFilter<"product"> | number;
    createdAt?: Prisma.DateTimeFilter<"product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"product"> | Date | string;
};
export type productOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type productWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.productWhereInput | Prisma.productWhereInput[];
    OR?: Prisma.productWhereInput[];
    NOT?: Prisma.productWhereInput | Prisma.productWhereInput[];
    name?: Prisma.StringFilter<"product"> | string;
    description?: Prisma.StringFilter<"product"> | string;
    price?: Prisma.FloatFilter<"product"> | number;
    imageUrl?: Prisma.StringFilter<"product"> | string;
    quantity?: Prisma.IntFilter<"product"> | number;
    createdAt?: Prisma.DateTimeFilter<"product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"product"> | Date | string;
}, "id">;
export type productOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.productCountOrderByAggregateInput;
    _avg?: Prisma.productAvgOrderByAggregateInput;
    _max?: Prisma.productMaxOrderByAggregateInput;
    _min?: Prisma.productMinOrderByAggregateInput;
    _sum?: Prisma.productSumOrderByAggregateInput;
};
export type productScalarWhereWithAggregatesInput = {
    AND?: Prisma.productScalarWhereWithAggregatesInput | Prisma.productScalarWhereWithAggregatesInput[];
    OR?: Prisma.productScalarWhereWithAggregatesInput[];
    NOT?: Prisma.productScalarWhereWithAggregatesInput | Prisma.productScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"product"> | number;
    name?: Prisma.StringWithAggregatesFilter<"product"> | string;
    description?: Prisma.StringWithAggregatesFilter<"product"> | string;
    price?: Prisma.FloatWithAggregatesFilter<"product"> | number;
    imageUrl?: Prisma.StringWithAggregatesFilter<"product"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"product"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"product"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"product"> | Date | string;
};
export type productCreateInput = {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type productUncheckedCreateInput = {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type productUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type productUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type productCreateManyInput = {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type productUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type productUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type productCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type productAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type productMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type productMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type productSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type productSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["product"]>;
export type productSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["product"]>;
export type productSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["product"]>;
export type productSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type productOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "price" | "imageUrl" | "quantity" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>;
export type $productPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "product";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["product"]>;
    composites: {};
};
export type productGetPayload<S extends boolean | null | undefined | productDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$productPayload, S>;
export type productCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<productFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
};
export interface productDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['product'];
        meta: {
            name: 'product';
        };
    };
    findUnique<T extends productFindUniqueArgs>(args: Prisma.SelectSubset<T, productFindUniqueArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends productFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, productFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends productFindFirstArgs>(args?: Prisma.SelectSubset<T, productFindFirstArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends productFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, productFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends productFindManyArgs>(args?: Prisma.SelectSubset<T, productFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends productCreateArgs>(args: Prisma.SelectSubset<T, productCreateArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends productCreateManyArgs>(args?: Prisma.SelectSubset<T, productCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends productCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, productCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends productDeleteArgs>(args: Prisma.SelectSubset<T, productDeleteArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends productUpdateArgs>(args: Prisma.SelectSubset<T, productUpdateArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends productDeleteManyArgs>(args?: Prisma.SelectSubset<T, productDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends productUpdateManyArgs>(args: Prisma.SelectSubset<T, productUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends productUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, productUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends productUpsertArgs>(args: Prisma.SelectSubset<T, productUpsertArgs<ExtArgs>>): Prisma.Prisma__productClient<runtime.Types.Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends productCountArgs>(args?: Prisma.Subset<T, productCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCountAggregateOutputType> : number>;
    aggregate<T extends ProductAggregateArgs>(args: Prisma.Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>;
    groupBy<T extends productGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: productGroupByArgs['orderBy'];
    } : {
        orderBy?: productGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, productGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: productFieldRefs;
}
export interface Prisma__productClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface productFieldRefs {
    readonly id: Prisma.FieldRef<"product", 'Int'>;
    readonly name: Prisma.FieldRef<"product", 'String'>;
    readonly description: Prisma.FieldRef<"product", 'String'>;
    readonly price: Prisma.FieldRef<"product", 'Float'>;
    readonly imageUrl: Prisma.FieldRef<"product", 'String'>;
    readonly quantity: Prisma.FieldRef<"product", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"product", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"product", 'DateTime'>;
}
export type productFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where: Prisma.productWhereUniqueInput;
};
export type productFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where: Prisma.productWhereUniqueInput;
};
export type productFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithRelationInput | Prisma.productOrderByWithRelationInput[];
    cursor?: Prisma.productWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type productFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithRelationInput | Prisma.productOrderByWithRelationInput[];
    cursor?: Prisma.productWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type productFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithRelationInput | Prisma.productOrderByWithRelationInput[];
    cursor?: Prisma.productWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type productCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.productCreateInput, Prisma.productUncheckedCreateInput>;
};
export type productCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.productCreateManyInput | Prisma.productCreateManyInput[];
    skipDuplicates?: boolean;
};
export type productCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    data: Prisma.productCreateManyInput | Prisma.productCreateManyInput[];
    skipDuplicates?: boolean;
};
export type productUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.productUpdateInput, Prisma.productUncheckedUpdateInput>;
    where: Prisma.productWhereUniqueInput;
};
export type productUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.productUpdateManyMutationInput, Prisma.productUncheckedUpdateManyInput>;
    where?: Prisma.productWhereInput;
    limit?: number;
};
export type productUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.productUpdateManyMutationInput, Prisma.productUncheckedUpdateManyInput>;
    where?: Prisma.productWhereInput;
    limit?: number;
};
export type productUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where: Prisma.productWhereUniqueInput;
    create: Prisma.XOR<Prisma.productCreateInput, Prisma.productUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.productUpdateInput, Prisma.productUncheckedUpdateInput>;
};
export type productDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
    where: Prisma.productWhereUniqueInput;
};
export type productDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.productWhereInput;
    limit?: number;
};
export type productDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.productSelect<ExtArgs> | null;
    omit?: Prisma.productOmit<ExtArgs> | null;
};
