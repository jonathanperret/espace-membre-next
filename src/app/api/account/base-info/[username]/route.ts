import { publicPostBaseInfoUpdate } from "@/controllers/usersController/baseInfo/publicPostBaseInfoUpdate";
import { getServerSession } from "next-auth";

export async function POST(
    req: Request,
    { params }: { params: { username: string } }
) {
    // console.log(req.body)
    // return Response.json({})
    const body = await req.json();
    const session = await getServerSession();

    return await publicPostBaseInfoUpdate(
        {
            body,
            params: {
                username: params.username,
            },
            auth: {
                id: session?.user?.name,
            },
        },
        Response
    );
}
