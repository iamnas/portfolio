
import Cursor from "./components/Cursor";
import { Avatar } from "./components/Avatar";
import { Experience } from "./components/Experience";

export default function Home() {
  return (
    <>

      <Cursor />

      <div className="py-[115px] px-4 max-w-[500px] mx-auto">
        <div className="grid grid-cols-4 gap-6 mb-10 items-center">
          <div className="col-span-1 mb-2">
            <Avatar />
          </div>
          <div className="col-span-3 text-white" >
            <div>
              <h1 className="text-2xl">Naresh Rao</h1>
              <p className="opacity-50">Full-Stack Blockchain Developer</p>
              <a
                className="text-white opacity-50"
                target="_blank"
                href="https://sepolia.etherscan.io/address/0x5F93bB15A5618fb9E051Ee5c1299EbA2a559f5A5"
              >
                nas.eth
              </a>
            </div>
          </div>
        </div>

        <div className="mb-14 text-white">
          <h2 className="text-xl mb-2">About</h2>
          <p className="text-sm opacity-50">
            {`GM ,I'm Naresh, a full-stack blockchain developer dedicated to crafting secure,
             scalable solutions that evolve with user needs and technology trends.`}

            {/* Hi, I'm Naresh. As a full-stack blockchain developer, 
          I specialize in creating innovative, secure solutions
          that drive transformative digital experiences. 
          I focus on building scalable systems from the ground up, 
          constantly refining and enhancing them based on real-world performance and user feedback. 
          Always evolving, always delivering. */}
          </p>
        </div>

        <div className="mb-14">
          {/* <h2 className="text-sm mb-10 text-slate-200">Work Experience</h2> */}
          <MiniHeader title="Work Experience" />

          <Experience
            href="https://vivin.io/"
            side="2024 - present"
            title="Full Stack Blockchain Developer – Vivin"
            desc="Developed the Source-Ledger web app, integrating APIs and handling backend development with NestJS to aggregate Solana influencers across various platforms. Also implemented backend logic for the Custom Address Wizard Telegram Bot."
            stack="Nestjs •TypeScript • Prisma • React "
          />
          <Experience
            href="https://orbis86.com/"
            side="2023 - 2024"
            title="Full Stack Blockchain Developer – Orbis86"
            desc="Developed and deployed smart contracts on EVM and Hedera for a Discord bot game web application, 
            integrating MetaMask and Hashpack wallets with the UI, and creating backend APIs and frontend API integrations."
            stack="React • Nodejs • Nestjs • Hashgraph • Prisma"
          />
          <Experience
            href="https://thefastway.in/"
            side="2023 – 2023"
            title="Backend End Engineer – TheFaseWay"
            desc="Developed a secure and compliant private sale launchpad smart contract for the BIPZY project, ensuring
                transparent token sales and robust security measures."
            stack="Solidity • Nodejs • Adonisjs • Nestjs • Prisma"
          />
          <Experience
            href="https://brugu.io/"
            side="2022 – 2023"
            title="Backend End Engineer – Brugu"
            desc="Focused on backend development and smart contract implementation to drive product functionality and security."
            stack="Solidity • Node • Web3.js"
          />


          <MiniHeader title="Side Projects" />
          {/* <h2 className="text-xl mt-14 mb-10">Side Projects</h2> */}

          
          <MiniHeader title="Links" />
          {/* <h2 className="text-xl mt-14 mb-10"></h2> */}

          <Experience
            side="Github"
            title="@iamnas"
            href="https://github.com/iamnas"
            link="true"
          // mb={4}
          />
          <Experience
            side="Etherscan"
            title="nas.eth"
            href="https://sepolia.etherscan.io/address/0x5F93bB15A5618fb9E051Ee5c1299EbA2a559f5A5"
            // mb={4}
            link="true"
          />
          {/* <Experience
            side="Foundation"
            title="@nas"
            href="https://foundation.app/@nas?tab=owned"
            // mb={4}
            link="true"
          /> */}
          <Experience
            side="Twitter"
            title="@0xnas.eth"
            href="https://twitter.com/0xnas_eth"
            // mb={4}
            link="true"
          />
        </div>
      </div>
    </>
  );
}


function MiniHeader({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-xl mb-10 text-slate-200">{title}</h2>
    </div>
  )
}
