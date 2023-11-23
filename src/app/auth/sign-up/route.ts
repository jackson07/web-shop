// import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@/server/infra/supabase/server";
import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
import { supabase } from "@/server/infra/db/supabase";

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	const formData = await request.formData();
	const email = String(formData.get("email"));
	const password = String(formData.get("password"));
	// const cookieStore = cookies();
	// const supabase = createClient(cookieStore);

	const { error } = await supabase().auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${requestUrl.origin}/auth/callback`,
		},
	});

	if (error) {
		return NextResponse.redirect(
			`${requestUrl.origin}/pages/login?error=Could not authenticate user`,
			{
				// a 301 status is required to redirect from a POST to a GET route
				status: 301,
			}
		);
	}

	return NextResponse.redirect(
		`${requestUrl.origin}/pages/login?message=Check email to continue sign in process`,
		{
			// a 301 status is required to redirect from a POST to a GET route
			status: 301,
		}
	);
}
