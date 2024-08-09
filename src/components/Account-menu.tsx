import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { GetManagedRestaurant } from "@/api/get-managed-restaurant";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./Store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity
  });

  const { data: managedRestaurant, isLoading: isRestaurantLoading } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: GetManagedRestaurant,
    staleTime: Infinity,
  });

  useEffect(() => {
    setIsLoading(isProfileLoading || isRestaurantLoading);
  }, [isProfileLoading, isRestaurantLoading]);

  const { mutateAsync: signOutFn, isPending: isSignOut } = useMutation({
    mutationFn: signOut,
    onMutate: () => {
      setIsRedirecting(true); // Ativa o overlay de carregamento ao iniciar o logout
    },
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
    onSettled: () => {
      setIsRedirecting(false); // Desativa o overlay de carregamento após o redirecionamento
    }
  })

  return (
    <div>
      {isRedirecting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <FaSpinner className="animate-spin h-16 w-16 text-white" />
        </div>
      )}
      <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 select-none">
            {isLoading ? <FaSpinner className="animate-spin h-4 w-4" /> : managedRestaurant?.name}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">

          <DropdownMenuLabel className="flex flex-col">
              {isProfileLoading ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32"/>
                  <Skeleton className="h-3 w-24"/>
                </div>
              ) : (
                <>
                  <span className="mb-0">{profile?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                </>
              )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator/>

          <DialogTrigger className="w-full">
            <DropdownMenuItem>
                <Building className="w-4 h-4 mr-2"/>
                <span>Perfil</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSignOut}>
              <button className="w-full" onClick={() => signOutFn()}>
                <LogOut className="w-4 h-4 mr-2"/>
                <span>Sair</span>
              </button>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
      </Dialog>
    </div>
  );
}
