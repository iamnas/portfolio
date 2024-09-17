import Image from "next/image";
import { FC } from "react";
// import { Grid } from "./Grid";
import arrowLink from "../public/arrow-link.svg";

interface ExperienceProps {
    side: string;
    title: string;
    desc?: string;
    stack?: string;
    image?: string;
    href?: string;
    link?: string;
}

export const Experience: FC<ExperienceProps> = ({ side, title, desc, stack, href,link, ...props }) => (
    // <Grid>
    <div className={`grid grid-cols-4 gap-4 mb-${link ? 4 : 10}`} {...props}>
        <div className="col-span-4 sm:col-span-1">
            <p className="text-white opacity-50">{side}</p>
        </div>
        <div className="col-span-4 sm:col-span-3 text-slate-300 text-sm">
            {/* {image && <Image className="w-9 mb-4" src={image} alt={title} />} */}
            <h3 className=" flex items-center">
                {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="flex items-center">
                        {title}
                        <Image
                            className="ml-2 transform translate-y-[1px]"
                            src={arrowLink}
                            alt={`link to ${title}`}
                        />
                    </a>
                ) : (
                    title
                )}
            </h3>
            {desc && <p className=" opacity-50 my-2">{desc}</p>}
            {stack && <p className="text-white opacity-50">{stack}</p>}
        </div>
    </div>
    // </Grid>
);
