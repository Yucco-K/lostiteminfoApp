import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = createRouteHandlerClient({ cookies });
		const session = await supabase.auth.exchangeCodeForSession(code);
		console.log(session);
	}

	// リダイレクト先を現在の環境に合わせて動的に設定
	return NextResponse.redirect(new URL("/", requestUrl.origin));
}
