import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = createRouteHandlerClient({ cookies });
		const session = await supabase.auth.exchangeCodeForSession(code);
		console.log(session);
	}

	return NextResponse.redirect(new URL("/", requestUrl.origin));
};
