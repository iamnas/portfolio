'use client'
import React, { useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
// import { parseAbi } from 'viem';
import ABI from '../../nft-contract/QRareMint.json';
import { contractAddress } from '../utils/config';
import Image from 'next/image';

import giphy from "../public/giphyOG.gif"
import generateCompactQRSVG from '../utils/generateQrSVG';

interface MintModalProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MintModal: React.FC<MintModalProps> = ({ name, isOpen, onClose }) => {
  // const [isLoading, setLoading] = useState(false);
  // const [isSuccess, setSuccess] = useState(false);
  const { address } = useAccount();


  const { data: hasMinted, isLoading: readMintedLoading } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: '_isMinted',
    args: [address as `0x${string}`],
  });

  const { data: hash, isPending, writeContract } = useWriteContract();
  // const { writeContract = useWriteContract();

  const svg = generateCompactQRSVG(`https://sepolia.etherscan.io/address/${address}`);

  const mint = useCallback(() => {
    if (writeContract) {
      writeContract({
        address: contractAddress,
        abi: ABI,
        functionName: 'safeMint',
        args: [svg]
      });
    }
  }, [writeContract, svg]);

  // const waitForTx = useCallback(async () => {
  //   if (!hash) return;
  //   setLoading(true);

  //   // await data.wait();
  //   isPending
  //   setLoading(false);
  //   setSuccess(true);
  // }, [data]);

  // useEffect(() => {
  //   waitForTx();
  // }, [data, waitForTx]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none" onClick={onClose}>
      <div className="relative w-auto max-w-sm mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-3xl shadow-lg outline-none focus:outline-none">
          <div className="flex flex-col items-center justify-end p-12 rounded-t">
            <Image className="w-24 mb-6" src={giphy} unoptimized alt="Free 3x3 NFT" />

            <h3 className="text-lg font-semibold mb-2">
              Thanks, {name}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {"As a thank you for connecting your wallet, enjoy a free mint of a unique QRareMint NFT, featuring a custom QR code for your digital identity."}
            </p>
            {hasMinted ? (
              <div>
                {/* <p >
                  You already minted one!
                </p> */}
                <div className='mt-4'>
                  <button className='w-full bg-black hover:bg-gray-900 text-white font-normal uppercase text-sm rounded-lg p-5 disabled:opacity-50'>
                    <a href={`https://testnets.opensea.io/${address}`} target='_blank' className="">
                      Check your wallet
                    </a>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  className="w-full bg-black hover:bg-gray-900 text-white font-normal uppercase text-sm rounded-lg py-4 mt-4 mb-2 disabled:opacity-50"
                  onClick={mint}
                  disabled={readMintedLoading || hasMinted as boolean}
                >
                  {hasMinted ? "You already minted one" : isPending ? "Minting..." : "Mint for free"}
                </button>
                {hash ? (
                  <a
                    className="text-xs text-gray-500 hover:text-gray-600"
                    target='_blank'
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                  >
                    view transaction
                  </a>
                ) : (
                  <a
                    className="text-xs text-gray-500 hover:text-gray-600"
                    target='_blank'
                    href={`https://sepolia.etherscan.io/address/${contractAddress}`}
                  >
                    view contract
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={onClose}></div> */}
    </div>
  );
};