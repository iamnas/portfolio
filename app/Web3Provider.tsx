"use client"
import { WagmiProvider, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Header } from "./components/Headers";

const config = createConfig(
    getDefaultConfig({
      chains: [sepolia],
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
      appName: "QRareMint",
      appDescription: "QRareMint - a Unique QR NFT",
      appUrl: "https://family.co",
      appIcon: "https://family.co/logo.png",
    }),
  );

  
// const config = createConfig(
//     getDefaultConfig({
//         // Your dApps chains
//         chains: [sepolia],
//         transports: {
//             // RPC URL for each chain
//             // [mainnet.id]: http(
//             //     `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
//             // ),
//             [sepolia.id]: http(
//                 `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
//             ),
//         },

//         // Required API Keys
//         walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

//         // Required App Info
//         appName: "QRareMint",

//         // Optional App Info
//         appDescription: "QRareMint - a Unique QR NFT",
//         appUrl: "https://family.co", // your app's url
//         appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//     }),
// );

const queryClient = new QueryClient();

export const Web3Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>
                    <Header />
                    {children}
                </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};