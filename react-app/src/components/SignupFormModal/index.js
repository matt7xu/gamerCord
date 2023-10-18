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
	const [image, setImage] = useState(null);
	const [errors, setErrors] = useState([]);
	const [showMenu, setShowMenu] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);
	const { closeModal } = useModal();

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errorMess = [];

    if (image != null) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      const fileExtension = image.name.split('.');

      if (!allowedExtensions.includes(fileExtension[fileExtension.length - 1])) {
        errorMess.push('Image file must have a valid extension: .png, .jpg, .jpeg')
      }
    }

		if (!validateEmail(email)) {
			errorMess.push("Email is not valid")
		}

		if (password.length < 5) {
			errorMess.push("Password must have more than 5 characters")
		}

		if (email.length < 5) {
			errorMess.push("Email must have more than 5 characters")
		}

		if (username === email) {
			errorMess.push("Email and Username cannot be the same")
		}

		if (password !== confirmPassword) {
			errorMess.push("Confirm Password field must be the same as the Password field")
		}

		setErrors(errorMess)


		if (errorMess.length === 0) {
			const useremail = email.toLowerCase();

			let formData = new FormData();
      formData.append("username", username);
      formData.append("email", useremail);
      formData.append("password", password);
			formData.append("image", image);

			setImageLoading(true);

			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				setImageLoading(false);
				closeModal();
			}
		}
	};


	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<h1>Create an account</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx} className="errors_mess">{error}</li>
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
				{(imageLoading)&& <p>Image Uploading...</p>}
				<label>
					User Avatar (optional)
					URL must end in .png, .jpg, or .jpeg
					<input
						type="file"
						// value={image}
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
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
