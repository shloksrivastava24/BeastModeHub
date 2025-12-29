interface WelcomeClientProps {
    user: string;
}

export function WelcomeClient({ user }: WelcomeClientProps) {
    return (
        <div className="text-xl font-bold">
            Welcome, {user}
        </div>
    );
}
