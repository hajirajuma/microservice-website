"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

//shadcn/ui components 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

//lucide-react icons
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Store,
  CheckCircle2,
  Package,
  Loader2,
} from "lucide-react";
import Toaster from "@/components/ui/toaster";

/* types*/
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

/*MAIN PAGE*/
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const { toast } = useToast();

  /*fetch products */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to load products",
        description: "Check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${process.env.API_URL}/products/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast({
        title: "Product removed",
        description: `"${deleteTarget.name}" has been deleted.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Could not delete the product. Please try again.",
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  /*  publish to store  */
  const publishToStore = async () => {
    if (!products.length) return;
    setPublishing(true);
    try {
      await fetch(`${process.env.API_URL}/products/publish-all`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productIds: products.map((p) => p.id) }),
      });
      setPublished(true);
      setShowPublishModal(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Publish failed",
        description: "Could not publish products. Please try again.",
      });
    } finally {
      setPublishing(false);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  /*  render */
  return (
    <div className="min-h-screen bg-muted/30 p-6 font-sans">
      <Toaster />

      {/*Delete confirmation (AlertDialog)*/}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{deleteTarget?.name}"</strong> will be permanently removed
              from your catalogue. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/*Publish success modal (Dialog) */}
      <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-200">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <DialogTitle className="text-center text-lg">
              Products are live!
            </DialogTitle>
            <DialogDescription className="text-center">
              All <strong>{products.length} product{products.length !== 1 ? "s" : ""}</strong> have
              been published to the customer storefront successfully.
            </DialogDescription>
          </DialogHeader>

          <p className="rounded-md bg-muted px-4 py-3 text-xs text-muted-foreground leading-relaxed">
            Customers can now browse and purchase these products. You are viewing
            the <strong>admin panel</strong> — the storefront is a separate page
            that customers see.
          </p>

          <DialogFooter className="sm:justify-center mt-2">
            <Button onClick={() => setShowPublishModal(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*Page wrapper  */}
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
              Inventory
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {loading
                ? "Loading catalogue…"
                : `${products.length} product${products.length !== 1 ? "s" : ""} in your catalogue`}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={publishToStore}
              disabled={publishing || products.length === 0 || published}
              title={
                products.length === 0
                  ? "Add products before publishing"
                  : published
                  ? "Already published to the store"
                  : "Push all products live to the customer storefront"
              }
            >
              {publishing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Publishing…</>
              ) : published ? (
                <><CheckCircle2 className="h-4 w-4 text-green-600" /> Published</>
              ) : (
                <><Store className="h-4 w-4" /> Publish to store</>
              )}
            </Button>

            <Button asChild>
              <Link href="/admin/admin.products/create">
                <Plus className="h-4 w-4" /> Add product
              </Link>
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}   
              className="pl-8"
            />
          </div>

          {!loading && search && (
            <span className="text-sm text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Table card */}
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-4.25px">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price/bag</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading skeletons */}
              {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-11 w-11 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40 mb-1.5" />
                      <Skeleton className="h-3 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-14 rounded-md" />
                        <Skeleton className="h-8 w-16 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

              {/* Empty state */}
              {!loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {search ? `No results for "${search}"` : "No products yet"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {search
                            ? "Try a different search term."
                            : "Click Add product to create your first one."}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Product rows */}
              {!loading &&
                filtered.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onDelete={() => setDeleteTarget(product)}
                  />
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer hint */}
        {!loading && products.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Click <strong className="text-foreground">Publish to store</strong> to make all products
            visible to customers. You will see a confirmation here — no page navigation required.
          </p>
        )}
      </div>
    </div>
  );
}

/* Product row component */
function ProductRow({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: () => void;
}) {
  const qty = product.quantity;

  const stockBadge =
    qty === 0 ? (
      <Badge variant="destructive">Out of stock</Badge>
    ) : qty < 10 ? (
      <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50">
        {qty} — Low stock
      </Badge>
    ) : (
      <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
        {qty} — In stock
      </Badge>
    );

  return (
    <TableRow className="group">
      {/* Image */}
      <TableCell>
        <div className="h-11 w-11 overflow-hidden rounded-md border bg-muted flex items-center justify-center shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-xl">📦</span>
          )}
        </div>
      </TableCell>

      {/* Name + ID */}
      <TableCell>
        <p className="font-medium text-sm leading-none">{product.name}</p>
        <p className="text-xs text-muted-foreground mt-1">ID #{product.id}</p>
      </TableCell>

      {/* Price */}
      <TableCell className="font-medium">${Number(product.price).toFixed(2)}</TableCell>

      {/* Stock badge */}
      <TableCell>{stockBadge}</TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/admin.products/edit/${product.id}`}>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}