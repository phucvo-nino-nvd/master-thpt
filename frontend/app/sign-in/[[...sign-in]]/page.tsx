import { SignIn } from '@clerk/nextjs';
import { AuthShell } from '@/components/auth-shell';

export default function SignInPage() {
	return (
		<AuthShell title="Mừng em quay lại!" note="Đăng nhập để giữ lửa, XP và lộ trình của em.">
			<SignIn />
		</AuthShell>
	);
}
