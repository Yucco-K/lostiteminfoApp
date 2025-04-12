"use client";

import { useState, useEffect, FormEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabaseAdmin as supabase } from "../../../lib/supabaseAdmin";
import styles from "../TopPage.module.css";

interface PostDetailProps {
	postId: string;
}

interface PostData {
	id: string;
	lostitem_name: string;
	find_date: string;
	find_time: string;
	find_place: string;
	comment: string;
	remarks_column: string;
	resolved: boolean;
	hidden: boolean;
	created_at: string;
	created_by: string;
	file_url?: string;
}

const PostDetail = ({ postId }: PostDetailProps) => {
	const [post, setPost] = useState<PostData | null>(null);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [editedPost, setEditedPost] = useState<PostData | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const supabaseClient = createClientComponentClient();
	const router = useRouter();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const { data: post, error } = await supabaseClient
					.from("post")
					.select("*")
					.eq("id", postId)
					.single();
				if (error) {
					console.error("Error fetching post:", error);
				} else {
					setPost(post);
					setEditedPost(post);
				}
			} catch (error) {
				console.error("Fetch post failed:", error);
			}
		};

		fetchPost();
	}, [postId, supabaseClient]);

	useEffect(() => {
		const getSession = async () => {
			const {
				data: { session },
			} = await supabaseClient.auth.getSession();
			setSession(session);

			if (session) {
				const { data: profile, error } = await supabaseClient
					.from("profile")
					.select("role")
					.eq("id", session.user.id)
					.single();

				if (error) {
					console.error("Error fetching profile:", error);
				} else {
					setUserRole(profile.role);
				}
			}
		};

		getSession();
	}, [supabaseClient]);

	const handleSaveChanges = async () => {
		if (!editedPost) return;

		try {
			console.log(`Updating post with ID: ${postId}`);
			const { error } = await supabase
				.from("post")
				.update({
					lostitem_name: editedPost.lostitem_name,
					find_date: editedPost.find_date,
					find_time: editedPost.find_time,
					find_place: editedPost.find_place,
					comment: editedPost.comment,
					remarks_column: editedPost.remarks_column,
					resolved: editedPost.resolved,
					hidden: editedPost.hidden,
					updated_at: new Date().toISOString(),
					updated_by: session?.user?.id || "",
				})
				.eq("id", postId);

			if (error) {
				throw new Error(error.message);
			}

			console.log("Update successful");
			setPost(editedPost);
			setIsEditMode(false);
			alert("Post updated successfully");
		} catch (error) {
			console.error("Update failed:", error);
			if (error instanceof Error) {
				alert(`Failed to update post: ${error.message}`);
			} else {
				alert("Failed to update post: An unknown error occurred");
			}
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		setEditedPost((prev) => {
			if (!prev) return null;
			return {
				...prev,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	};

	if (!post) return <p>Loading...</p>;

	// find_timeの秒を取り除き、先頭の0を除去
	const formattedFindTime = post.find_time
		? post.find_time.slice(0, 5).replace(/^0/, "")
		: "未設定";

	if (!editedPost) return null;

	return (
		<>
			{/* ヘッダー */}
			<header className="w-full">
				<div className="w-full max-w-5xl mx-auto">
					<h1 className="flex flex-wrap flex-col gap-y-1.5 text-center mx-auto py-5 w-fit">
						<span className="bg-neutral-100 rounded-e-full rounded-l-full text-3xl inline-block place-self-center p-2">
							📦
						</span>
						<span className="block text-sm font-bold">
							おとしものインフォメーション
						</span>
					</h1>
				</div>
			</header>

			{/* メインコンテンツ */}
			<main className="w-full pb-24">
				<div className="w-full">
					<h2
						className={`w-full bg-neutral-100 text-lg font-bold text-black z-10 sticky top-0 ${styles.contents_h2}`}
					>
						<div className="w-full max-w-5xl mx-auto p-4">
							📝 おとしもの詳細
						</div>
					</h2>
					<div className="w-full max-w-5xl mx-auto pt-2 pb-10 px-5 mt-5">
						<div className="w-full">
							<div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
								<div className="bg-white p-6 rounded-lg shadow-md mb-6">
									<div className="flex justify-between items-center mb-4">
										<div>
											<p className="text-gray-700 font-bold">
												登録日：{new Date(post.created_at).toLocaleDateString()}
											</p>
										</div>
									</div>
									<h1 className="text-2xl font-bold mb-4">
										{isEditMode ? (
											<input
												title="Input Field"
												type="text"
												name="lostitem_name"
												value={editedPost.lostitem_name}
												onChange={handleChange}
												className="w-full border border-gray-300 rounded p-2"
											/>
										) : (
											<div className="flex justify-between">
												{post.lostitem_name}
												{post.resolved ? (
													<Image
														src="/img/true.png"
														alt="Resolved"
														width={70}
														height={70}
														className="rounded-full inline-block mr-15"
													/>
												) : null}
											</div>
										)}
									</h1>
									<div className="mb-4 flex flex-col md:flex-row gap-4">
										<div className="flex flex-col gap-2">
											<p className="text-gray-700 font-bold">
												発見日：
												{isEditMode && editedPost ? (
													<input
														type="date"
														name="find_date"
														value={editedPost.find_date}
														onChange={handleChange}
														className="w-full border border-gray-300 rounded p-2"
														title="発見日"
													/>
												) : (
													new Date(post.find_date).toLocaleDateString()
												)}
											</p>
										</div>
										<div className="flex flex-col gap-2">
											<p className="text-gray-700 font-bold">
												発見場所：
												{isEditMode ? (
													<input
														type="text"
														name="find_place"
														value={editedPost.find_place}
														onChange={handleChange}
														className="w-full border border-gray-300 rounded p-2"
														title="発見場所"
													/>
												) : (
													post.find_place
												)}
											</p>
										</div>
										<div className="flex flex-col gap-2">
											<p className="text-gray-700 font-bold">
												発見時間：
												{isEditMode ? (
													<input
														type="time"
														name="find_time"
														value={editedPost.find_time}
														onChange={handleChange}
														className="w-full border border-gray-300 rounded p-2"
														title="発見時間"
													/>
												) : (
													formattedFindTime
												)}
											</p>
										</div>
									</div>
									<div className="mb-4">
										<p className="text-gray-700 font-bold">
											コメント：
											{isEditMode ? (
												<textarea
													name="comment"
													value={editedPost.comment}
													onChange={handleChange}
													className="w-full border border-gray-300 rounded p-2"
													title="コメント"
												/>
											) : (
												post.comment
											)}
										</p>
										<p className="text-gray-700 mt-4 font-bold">
											投稿者：{post.created_by}
										</p>
									</div>
									<div className="w-full h-64 flex items-center justify-center">
										{post.file_url ? (
											<Image
												src={post.file_url}
												alt="Lost Item"
												width={200}
												height={150}
												className="w-1/3 h-auto"
											/>
										) : (
											<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
												<p className="text-gray-500">画像がありません</p>
											</div>
										)}
									</div>
								</div>
								{/* {userRole === 'admin' && ( */}{" "}
								{/*お披露目用にroleがadminの場合でなくても表示するように設定。*/}
								<div className="bg-amber-50 p-6 rounded-lg">
									<h2 className="text-xl font-bold mb-4">
										★ 管理者権限設定 <span className="text-sm text-gray-600" />
									</h2>
									<ul className="list-disc pl-5 space-y-2">
										<li>
											<input
												type="checkbox"
												checked={isEditMode}
												onChange={(e) => setIsEditMode(e.target.checked)}
												title="編集モード"
											/>{" "}
											このスレッドを編集する
										</li>
										{isEditMode && (
											<>
												<li>
													<input
														type="checkbox"
														name="resolved"
														checked={editedPost?.resolved || false}
														onChange={handleChange}
														title="解決済み"
													/>{" "}
													このスレッドを「解決済み」に設定する
												</li>
												<li>
													<input
														type="checkbox"
														name="hidden"
														checked={editedPost?.hidden || false}
														onChange={handleChange}
														title="非表示"
													/>{" "}
													このスレッドを「非表示」に設定する
												</li>
												<li>
													<p className="text-gray-700 font-bold">
														備考欄：
														{isEditMode ? (
															<textarea
																name="remarks_column"
																value={editedPost.remarks_column}
																onChange={handleChange}
																className="w-full border border-gray-300 rounded p-2"
																title="Remarks Column"
															/>
														) : (
															post.remarks_column
														)}
													</p>
												</li>
											</>
										)}
									</ul>
									{isEditMode && (
										<button
											type="button"
											onClick={handleSaveChanges}
											className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700"
										>
											変更を保存
										</button>
									)}
								</div>
								{/* )} */}
								<button
									type="button"
									onClick={() => router.back()}
									className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700"
								>
									戻る
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default PostDetail;
