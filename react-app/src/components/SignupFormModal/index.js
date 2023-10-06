import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState("");
	const [errors, setErrors] = useState([]);
	const [showMenu, setShowMenu] = useState(false);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (image && (checkImage(image))) {
			setErrors(["Image URL must end in .png, .jpg, or .jpeg"]);
		}

		if (password === confirmPassword && Object.values(errors).length === 0) {
			const data = await dispatch(signUp(username, email, password, image));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const checkImage = (urlString) => {
		const endings = ["png", "jpg", "jpeg"];
		const array = urlString.split(".");
		if (endings.includes(array[array.length - 1])) {
			return false;
		}
		return true;
	}

	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<h1>Create an account</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					EMAIL
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					USERNAME
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					PASSWORD
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					CONFIRM PASSWORD
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					User Avatar Image
					<input
						type="text"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</label>
				<button type="submit">Continue</button>
				<div>By registering, you agree to GamerCord's Terms of Service and Privacy Policy.</div>
				<div>
					<OpenModalButton
						buttonText="Already have an account"
						onItemClick={closeMenu}
						modalComponent={<LoginFormModal />}
					/>
				</div>

			</form>
		</>
	);
}

export default SignupFormModal;
