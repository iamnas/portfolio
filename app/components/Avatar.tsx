'use client'
import { useEffect, useState } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { trimAddress } from '../utils/address';
import { MintModal } from './MintModal';
import Image from 'next/image';

import profilePic from '../public/profile.png'
import blurs from "../public/blurs.png";

const spin = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const Avatar = () => {
    const [hasMounted, setMounted] = useState(false);
    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <>
            {address && (
                <MintModal
                    name={ensName || trimAddress(address)}
                    isOpen={isOpen}
                    // onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                />
            )}
            <div
                className={`relative cursor-${address ? 'pointer' : 'default'} transition-transform duration-250 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] hover:scale-105`}
                onClick={() => address && setIsOpen(true)}
            >
                <div className="relative flex items-center justify-center">
                    {address && (
                        // <div
                        //     className={`absolute inset-0 flex items-center justify-center animate-spin-slow ${isOpen ? 'animate-spin' : ''
                        //         }`}
                        //     style={{ animation: `${spin} infinite 2.5s paused linear` }}
                        // >
                        <div
                            className={`absolute inset-0 flex items-center justify-center animate-spin-slow animate-spin`}
                            style={{ animation: `${spin} infinite 2.5s paused linear` }}
                        >
                            <Image
                                alt='QRareMint'
                                className="absolute w-full lg:w-[135%] max-w-none"
                                src={blurs}
                                role="presentation"
                                style={{ animation: `${spin} infinite 5s linear` }}
                            />
                        </div>
                    )}
                    <Image
                        className="rounded-full w-[80%] lg:w-full"
                        src={profilePic}
                        alt="QRareMint"
                    />
                </div>
            </div>
        </>
    );
};
