'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
// import { parseAbi } from 'viem';
import ABI from '../../nft-contract/QRareMint.json';
import { contractAddress } from '../utils/config';
import Image from 'next/image';

import giphy from "../public/giphyOG.gif"

interface MintModalProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MintModal: React.FC<MintModalProps> = ({ name, isOpen, onClose }) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { address } = useAccount();

  // const parsedAbi = parseAbi(ABI);

  const { data: hasMinted, isLoading: readMintedLoading } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'hasAddressMinted',
    args: [address as `0x${string}`],
  });

  const { writeContract, data } = useWriteContract();

  const mint = useCallback(() => {
    if (writeContract) {
      writeContract({
        address: contractAddress,
        abi: ABI,
        functionName: 'mint',
      });
    }
  }, [writeContract]);

  const waitForTx = useCallback(async () => {
    if (!data) return;
    setLoading(true);
    await data.wait();
    setLoading(false);
    setSuccess(true);
  }, [data]);

  useEffect(() => {
    waitForTx();
  }, [data, waitForTx]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-sm mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-3xl shadow-lg outline-none focus:outline-none">
          <div className="flex flex-col items-center justify-end p-12 rounded-t">
            <Image className="w-24 mb-6" src={giphy} alt="Free 3x3 NFT" />
          
            <h3 className="text-lg font-semibold mb-2">
              Thanks, {name}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              As you've come all this way and even connected your wallet, it's only right to
              give you something in return. You can mint one of my 3x3 generated NFTs for
              free.
            </p>
            {isSuccess ? (
              <p className="my-4">
                Success!{' '}
                <a href={`https://rainbow.me/${address}`} className="text-blue-500 hover:text-blue-600">
                  Check your wallet
                </a>
              </p>
            ) : (
              <>
                <button
                  className="w-full bg-black hover:bg-gray-900 text-white font-normal uppercase text-sm rounded-lg py-4 mt-4 mb-2 disabled:opacity-50"
                  onClick={mint}
                  disabled={readMintedLoading || hasMinted as boolean || isLoading}
                >
                  {hasMinted ? "You already minted one" : isLoading ? "Minting..." : "Mint for free"}
                </button>
                {data?.hash ? (
                  <a
                    className="text-xs text-gray-500 hover:text-gray-600"
                    href={`https://etherscan.io/tx/${data.hash}`}
                  >
                    view transaction
                  </a>
                ) : (
                  <a
                    className="text-xs text-gray-500 hover:text-gray-600"
                    href={`https://etherscan.io/address/${contractAddress}`}
                  >
                    view contract
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={onClose}></div>
    </div>
  );
};